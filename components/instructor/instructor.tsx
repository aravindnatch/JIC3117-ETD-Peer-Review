import { useState } from 'react'
import AddCourse from './modals/addCourse'
import Main from './views/main'
import CourseView from './views/courseView'
import EvalView from './views/evalView'

export default function Instructor(userData: any) {
  const [ addCourse, setAddCourse ] = useState(false)
  const [ active, setActive ] = useState<any>(null)
  const [ evalView, setEvalView ] = useState(null)
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
            evalView ? (
              <EvalView evalView={evalView} setEvalView={setEvalView} />
            ) : (
              <CourseView active={active} setActive={setActive} setEvalView={setEvalView}/>
            )
          ) : (
            <Main userData={data} setAddCourse={setAddCourse} setActive={setActive} />
          )
        }

      </div>
    </>
  )
}