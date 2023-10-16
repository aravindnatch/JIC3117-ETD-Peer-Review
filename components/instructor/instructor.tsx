import { useState } from 'react'
import AddCourse from './modals/addCourse'
import Main from './views/main'
import CourseView from './views/courseView'

export default function Instructor(userData: any) {
  const [ addCourse, setAddCourse ] = useState(false)
  const [ active, setActive ] = useState<any>(null)
  const { data } = userData

  return (
    <>
      {
        addCourse && (
          <AddCourse userData={data} setAddCourse={setAddCourse} />
        )
      }
      <div className="flex flex-grow flex-col">
        {
          active ? (
            <CourseView active={active} setActive={setActive} />
          ) : (
            <Main userData={data} setAddCourse={setAddCourse} setActive={setActive} />
          )
        }

      </div>
    </>
  )
}