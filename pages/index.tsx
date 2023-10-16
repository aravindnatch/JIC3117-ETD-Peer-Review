import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const { error } = router.query as { error: string }
    const { success } = router.query as { success: string }

    if (error) {
      toast.error(error)
    } 
    
    if (success) {
      toast.success(success)
    }
  }, [router.query])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-full">
      <Head>
        <title>Effective Team Dynamics Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-5">
        <div>
          Effective Team Dynamics Tool
        </div>
        <div onClick={(e) => {window.location.replace('/login')}} className="pb-2">
          <button className="w-full bg-gray-200 rounded-xl px-5 py-0.5">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
