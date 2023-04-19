import { useEffect, useState } from 'react'
import { useData } from '@contexts/data-context'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'

export default function Teacher() {
  const { data } = useData()
  const [ selecting, setSelecting ] = useState<Boolean>(true)
  const [ current, setCurrent ] = useState<any>(data[0])
  const router = useRouter()

  function goHome() {
    router.push('/')
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  function handleSelectCurrent(e: any) {
    setCurrent(data[e.target.value])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Instructor Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full justify-center border-b">
        <div className="flex w-full h-16 items-center justify-between px-5 align-center">
          {
            selecting ? (
              <select className="flex items-center border-none outline-none focus:ring-0 focus:ring-offset-0 appearance-none text-lg font-semibold">
                <option className="select-none text-xl font-bold">CS 3311</option>
              </select>
            ) : (
              <div className="flex flex-row space-x-4 h-full align-middle items-center justify-center">
                <div onClick={() => setSelecting(true)} className={`select-none flex text-md cursor-pointer h-full`}>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">CS 3311</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className={`w-5 h-5`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className={`select-none flex text-md h-full`}>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">Team 1</p>
                  </div>
                </div>
              </div>
            )
          }


          <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
            <div className="flex items-center">
              <div className="text-lg font-semibold select-none cursor-pointer" onClick={goHome}>Exit</div>
            </div>
          </div>
        </div>
      </div>

      {
        selecting ? (
          <div className="p-8 flex flex-col">
            <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
              <p className="text-2xl font-bold opacity-70">Teams</p>
              <span className="flex flex-row items-center">
                <p className="font-semibold opacity-70 cursor-pointer">Add Team</p>
                <BiPlus className="ml-1 text-lg cursor-pointer" />
              </span>
            </div>

            <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
              <div className="flex flex-row justify-between items-center">
                <div className="">
                  <p className="font-semibold">Team 1</p>
                  <div className="flex flex-row space-x-4 mt-2">
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm opacity-80">Completion: 20%</p>
                    </div>
                  </div>
                </div>
                <div onClick={() => setSelecting(false)}>
                  <IoIosArrowDroprightCircle className="text-4xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 px-8 flex flex-col">
              <div className="select-none text-left flex flex-row border-b pb-2 items-center">
                showing reviews for
                <select onChange={handleSelectCurrent} className="flex items-center border-none outline-none focus:ring-0 focus:ring-offset-0 appearance-none text-lg font-semibold">
                  {
                    data.map((people, index) => (
                      <option key={index} value={index} className="select-none text-xl font-bold">{people.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
                <div className="flex flex-row">
                  <div>
                    <p className="font-semibold opacity-80">George P. Burdell's Responses</p>
                    <div className="flex flex-col mt-2">
                      <div className="flex flex-col">
                        <div className="mt-4 h-full">
                          <p className="font-semibold text-sm inline-block mr-2 opacity-50">1. This person is leading the discussions and contributing ideas to the project your team is working on.</p>
                          <p className="text-xs opacity-30 inline-block">1 = Under-performing, 2 = Average, 3 = Excellent performance.</p>
                        </div>
                        <p className="font-semibold text-sm opacity-70">Answered: {current.q1}</p>
                      </div>

                      <div className="flex flex-col">
                        <div className="mt-4 h-full">
                          <p className="font-semibold text-sm inline-block mr-2 opacity-50">Please explain your rating for the question above.</p>
                        </div>
                        <p className="font-semibold text-sm opacity-70">Answered: {current.q2}</p>
                      </div>

                      <div className="flex flex-col">
                        <div className="mt-4 h-full">
                          <p className="font-semibold text-sm inline-block mr-2 opacity-50">2. This person is involved in conversations and following the deadlines and requirements set up by your team.</p>
                          <p className="text-xs opacity-30 inline-block">1 = Under-performing, 2 = Average, 3 = Excellent performance.</p>
                        </div>
                        <p className="font-semibold text-sm opacity-70">Answered: {current.q3}</p>
                      </div>

                      <div className="flex flex-col">
                        <div className="mt-4 h-full">
                          <p className="font-semibold text-sm inline-block mr-2 opacity-50">Please explain your rating for the question above.</p>
                        </div>
                        <p className="font-semibold text-sm opacity-70">Answered: {current.q4}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    

    </div>
  )
}