import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useCookies } from "react-cookie";
import axios from 'axios'

export default function PeerReview({course, username}: any) {
  const router = useRouter()
  const [ current , setCurrent ] = useState<any>(course.teams[0].members[0])
  const [formData, setFormData] = useState<any>({});
  const [ cookies ] = useCookies(['userData']);
  
  function handleCurrent(username: string) {
    if (!formData[username]) {
      setFormData((prevFormData: any) => ({...prevFormData, [username]: {}}));
    }

    setCurrent(course.teams[0].members.find((member: any) => member.username === username))
  }

  function handleNumberChoice(questionIndex: number, numberChoice: number) {
    setFormData((prevFormData: any) => ({
      ...prevFormData, 
      [current.username]: {
        ...prevFormData[current.username],
        [`q${questionIndex}`]: numberChoice,
      },
    }));
  }

  function handleTextAreaChange(text: string) {
    setFormData((prevFormData: any) => ({
      ...prevFormData, 
      [current.username]: {
        ...prevFormData[current.username],
        [`feedback`]: text,
      },
    }));
  }

  function getDate() {
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  function areAllNumberQuestionsAnswered() {
    return course.teams[0].members.every((member: any) => {
      const userResponses = formData[member.username] || {};
      return course.questions.every((_: any, index: any) => userResponses.hasOwnProperty(`q${index}`));
    });
  }

  const handleSubmit = () => {
    if (areAllNumberQuestionsAnswered()) {
      console.log(formData);

      axios.defaults.headers.common['Authorization'] = cookies.userData.token
      axios.post("/api/team/addFeedback", {
        'courseID': course._id,
        'formData': formData,
        'username': username,
      }).then((res) => {
        window.location.reload()
      }).catch((err) => {
        toast.error(err.response?.data || "internal server error")
      })
    } else {
      toast.error("Please answer all questions before submitting.");
    }
  };
  const currentIndex = course.teams[0].members.findIndex((member: any) => member.username === current.username);

  function goToNextUser() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < course.teams[0].members.length) {
      setCurrent(course.teams[0].members[nextIndex]);
      // scroll to top of page
      window.scrollTo(0, 0);
    }
  }

  const isLastUser = currentIndex === course.teams[0].members.length - 1;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex w-full justify-center border-b">
        <div className="flex w-full h-16 items-center justify-between px-5 align-center overflow-auto">
          <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center mx-5">
            {
              course.teams[0].members?.map((person: any, i: number) => (
                <>
                  <div 
                    onClick={() => handleCurrent(person.username)} 
                    className={`select-none flex text-md cursor-pointer h-full ${
                      course.teams[0].members.findIndex((m: any) => m.username === person.username) < currentIndex + 1 ? "text-indigo-500" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <p className="text-lg font-semibold">{person.username}</p>
                    </div>
                  </div>

                  {
                    i !== course.teams[0].members.length - 1 && (
                      <div className="flex items-center">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5  ${
                          course.teams[0].members.findIndex((m: any) => m.username === person.username) < currentIndex + 1 ? "text-indigo-500" : ""
                          }`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          {/* <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
            <div className="flex items-center">
              {
                false ? (
                  <div className="text-lg font-semibold select-none cursor-pointer" onClick={goHome}>Submit</div>
                ) : (
                  <div className="text-lg font-semibold select-none cursor-pointer" onClick={goHome}>Exit (Incomplete)</div>
                )
              }
            </div>
          </div> */}
        </div>
      </div>
    
      <div className="p-4 flex flex-col">
        <div className="select-none text-left">
          <p className="font-semibold opacity-40 text-sm">{getDate()}</p>
          <p className="text-2xl font-bold opacity-70">Peer Evaluation Form</p>
        </div>

        <div className="mt-4 flex flex-col h-full p-2 -ml-1 rounded-xl bg-gray-100">
          <p className="text-lg font-medium opacity-80">How do you think <span className="mx-0 font-bold underline underline-offset-8 decoration-blue-500">{current.username}</span> is performing?</p>
          <p className="text-sm opacity-80">Please complete the form by the given deadline.</p>
        </div>

        {
          course.questions.map((question: any, i: number) => (
            <>
              <div className="mt-4 h-full">
                <p className="font-semibold mr-2">{question} <span className="text-red-500">*</span></p>
                <p className="text-sm opacity-70 mt-1">1 = Under-performing, 2 = Average, 3 = Excellent performance.</p>
              </div>

              <div className="mt-4 flex flex-row h-full space-x-2 mb-4">
                {
                  [1, 2, 3].map((num: number) => (
                    <div key={num} className={`select-none border-2 px-8 py-1 rounded-xl ${formData[current.username]?.[`q${i}`] === num ? "border-indigo-500" : ""}`} onClick={() => handleNumberChoice(i, num)}>
                      {num}
                    </div>
                  ))
                }
              </div>
            </>
          ))
        }

        <div className="mt-4 flex flex-col h-full">
          <p className="font-semibold">Additional Feedback (Optional)</p>
          <p className="text-sm opacity-80 mb-3">This can only be seen by the course instructor.</p>
          <textarea 
            className="border rounded-xl w-full h-32 p-2"
            value={formData[current.username]?.feedback || ''}
            onChange={(e) => handleTextAreaChange(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center p-4 mt-4">
          <button 
            className="bg-indigo-500 text-white font-bold py-2 px-6 rounded-xl"
            onClick={isLastUser ? handleSubmit : goToNextUser}
          >
            {isLastUser ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}