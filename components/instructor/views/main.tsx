import { useState } from 'react'
import { BiCog, BiPlus, BiRightArrowAlt } from 'react-icons/bi'
import AddQuestions from '../modals/addQuestions'
import EditQuestions from '../modals/editQuestions'

export default function Main({userData, setAddCourse, setActive}: any) {
  const [ addQuestions, setAddQuestions ] = useState(false)
  const [ editQuestions, setEditQuestions ] = useState(false)

  return (
    <>
      {
        addQuestions && (
          <AddQuestions setAddQuestions={setAddQuestions} />
        )
      }
      {
        editQuestions && (
          <EditQuestions editQuestions={editQuestions} setEditQuestions={setEditQuestions} />
        )
      }
      <div className="p-8 flex flex-col">
        <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
          <p className="text-2xl font-bold">Your Question Sets</p>
          <div className="flex flex-row items-center rounded-xl px-2" onClick={() => setAddQuestions(true)}>
            <p className="font-semibold cursor-pointer opacity-80">Add Question Set</p>
            <BiPlus className="ml-1 text-lg cursor-pointer" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-4">
          {
            userData.questions?.map((set: any) => (
              <div className="mt-4 flex flex-col h-full border rounded-xl p-4 ">
                <div className="flex flex-row justify-between items-center h-full">
                  <div className="w-full">
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-semibold">{set.name}</p>
                      <div onClick={() => {setEditQuestions(set)}} className="cursor-pointer">
                        <BiCog className="text-xl opacity-80" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm opacity-80">Questions: {set.questions.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="p-8 flex flex-col">
        <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
          <p className="text-2xl font-bold">Your Courses</p>
          <div className="flex flex-row items-center rounded-xl px-2" onClick={() => setAddCourse(true)}>
            <p className="font-semibold cursor-pointer opacity-80">Add Course</p>
            <BiPlus className="ml-1 text-lg cursor-pointer" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-4">
          {
            userData.courses?.map((course: any) => (
              <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
                <div className="flex flex-row justify-between items-center h-full px-1 mb-3">
                  <div className="w-full">
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-semibold">{course.name}</p>
                      <BiCog className="text-xl opacity-80" />
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm opacity-80">Students: {course.students.length}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm opacity-80">Teams: {course.teams?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div onClick={() => setActive(course)} className="hover:opacity-80 mt-1 rounded-xl flex justify-between items-center cursor-pointer py-2.5 px-5 select-none border">
                  <div className="text-sm font-semibold">
                    View Course
                  </div>
                  <div className="text-xl">
                    <BiRightArrowAlt />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}