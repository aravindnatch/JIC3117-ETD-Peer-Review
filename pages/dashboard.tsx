import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Student from '@components/dashboard/student'
import Instructor from '@components/dashboard/instructor'

const Dashboard: NextPage = () => {
  const [ isInstructor, setIsInstructor ] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!router.query.instructor) return

    // TODO: replace with proper login logic
    const instructor = router.query.instructor === 'true'
    setIsInstructor(instructor)
  }, [router.query])

  return (
    <>
      {
        isInstructor ? (
          <Instructor />
        ) : (
          <Student />
        )
      }
    </>
  )
}

export default Dashboard