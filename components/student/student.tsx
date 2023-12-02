import { useState } from 'react'
import AddCourse from './modals/addCourse'
import Main from './views/main'
import PeerReview from './views/peerReview'

export default function Student(userData: any) {
  const [ addCourse, setAddCourse ] = useState(false)
  const [ reviewing, setReviewing ] = useState<any>(null)
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
          reviewing ? (
            <PeerReview course={reviewing} username={data.username} />
          ) : (
            <Main userData={data} setAddCourse={setAddCourse} setReviewing={setReviewing} />
          )
        }

      </div>
    </>
  )
}