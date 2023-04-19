import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Home: NextPage = () => {
  const users = ['student', 'instructor']
  const router = useRouter()
  
  function handleLogin(instructor: boolean) {
    // TODO: add login logic
    router.push('/dashboard?instructor=' + instructor)
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-full">
      <Head>
        <title>Effective Team Dynamics Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2 gap-4">
        {
          users.map((user, i) => (
            <div key={i}>
              <p className="pb-2 text-center">
                {user} login
              </p>
              <div className="pb-2">
                <input 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1" 
                  required 
                />
              </div>
              <div className="pb-2">
                <input 
                  type='password'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1" 
                  required 
                />
              </div>
              <div onClick={(e) => handleLogin(user === 'instructor')} className="pb-2">
                <button className="w-full bg-gray-200 rounded-xl">
                  Login
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
