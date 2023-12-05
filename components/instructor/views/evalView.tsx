import { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'

interface CourseViewProps {
  evalView: any
  setEvalView: any
}

export default function EvalView({evalView, setEvalView}: CourseViewProps) {
  const { course, team } = evalView

  const [ currentData, setCurrentData ] = useState<any>(null)

  function handleChange(e: any) {
    const selectedUsername = e.target.value;
    const aggregatedResponses: any = {};

    team.members.forEach((member: any) => {
      if (member.evaluation && member.evaluation[selectedUsername]) {
        const evaluationForSelectedUser = member.evaluation[selectedUsername];

        if (!aggregatedResponses[member.username]) {
          aggregatedResponses[member.username] = {};
        }

        // Aggregate the responses for each question
        Object.keys(evaluationForSelectedUser).forEach(question => {
          aggregatedResponses[member.username][question] = evaluationForSelectedUser[question];
        });
      }
    });

    if (Object.keys(aggregatedResponses).length === 0) {
      console.log(`No evaluation data available for ${selectedUsername}.`);
      setCurrentData(null);
      return;
    }

    setCurrentData(aggregatedResponses);
    console.log(aggregatedResponses);
  }

  useEffect(() => {
    handleChange({target: {value: team.members[0].username}});
  }, [])

  return (
    <>
      <div className="p-8 py-8 pb-0 ml-1 flex flex-col">
        <div className="select-none text-left flex flex-row border-b pb-2 items-center">
          <div onClick={() => {setEvalView(null)}}>
            <BiChevronLeft className="text-2xl cursor-pointer mr-1" />
          </div>
          <p className="text-xl font-semibold opacity-80">{team.name} Evaluations</p>
        </div>
      </div>

      <div className="px-11 py-4 flex flex-col">
        <div className="select-none text-left flex flex-row border-b pb-2 items-center">
          showing evaluations for
          <select onChange={handleChange} className="flex items-center border-none outline-none focus:ring-0 focus:ring-offset-0 appearance-none text-lg font-semibold">
            {
              team.members?.map((person: any, index: string) => (
                <option key={person.username} value={person.username} className="select-none text-xl font-bold">{person.username}</option>
              ))
            }
          </select>
        </div>

        {
          team.members.map((person: any, index: number) => (  
            <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
              <div className="flex flex-row">
                <div>
                  <p className="font-semibold opacity-80">{person.username}'s response</p>
                  {
                    course.questions.map ((question: any, index: number) => (
                      <div className="flex flex-col mt-2" key={index}>
                        <div className="flex flex-col">
                          <div className="mt-4 h-full">
                            <p className="font-semibold text-sm inline-block mr-2 opacity-80">{index + 1}. {question}</p>
                            <p className="text-xs opacity-50 mb-1">0 = Disengaged, 1 = Below Average, 2 = Average, 3 = Above Average.</p>
                          </div>
                          <p className="font-semibold text-sm opacity-70 mt-2">Answered: {currentData?.[person.username]?.[`q${index}`]}</p>
                          <p className="font-semibold text-sm opacity-70 mt-2">Justification: {currentData?.[person.username]?.[`feedback${index}`]}</p>
                        </div>
                      </div>
                    ))
                  }
                  {
                    currentData?.[person.username]?.feedback && (
                      <div className="flex flex-col mt-2">
                        <div className="flex flex-col">
                          <div className="mt-4 h-full">
                            <p className="font-semibold text-sm inline-block mr-2 opacity-80">Feedback</p>
                          </div>
                          <p className="font-semibold text-sm opacity-70 mt-2">{currentData?.[person.username]?.feedback}</p>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}