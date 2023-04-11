import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Student from '@components/dashboard/student'
import Teacher from '@components/dashboard/teacher'

const Dashboard: NextPage = () => {
  const [ isTeacher, setIsTeacher ] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!router.query.teacher) return

    // TODO: replace with proper login logic
    const teacher = router.query.teacher === 'true'
    setIsTeacher(teacher)
  }, [router.query])

  return (
    <>
      {
        isTeacher ? (
          <Teacher />
        ) : (
          <Student />
        )
      }
    </>
  )
}

export default Dashboard