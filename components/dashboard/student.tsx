import { useEffect, useState } from 'react'
import { useData } from '@contexts/data-context'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Student() {
  const { data, setData } = useData()
  const [ current, setCurrent ] = useState<any>(data[0])
  const [ canSubmit, setCanSubmit ] = useState<boolean>(false)
  const router = useRouter()

  function handleCurrent(id: number) {
    if (Object.values(current).some((value: any) => value === null || value === "")) {
      if (id > current.id) {
        return
      }
    }

    setCurrent(data[id])
  }

  function getDate() {
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  function goHome() {
    router.push('/')
  }

  useEffect(() => {
    const hasNull = data.some((person: any) => {
      return Object.values(person).some((value: any) => value === null || value === "")
    })

    if (!hasNull) {
      setCanSubmit(true)
    }
  }, [data, current])

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Student Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full justify-center border-b">
        <div className="flex w-full h-16 items-center justify-between px-5 align-center">
          <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
            {
              data.map((person: any, i: number) => (
                <>
                  <div onClick={() => handleCurrent(person.id)} className={`select-none flex text-md cursor-pointer h-full ${person.id <= current.id ? "text-indigo-500" : ""}`}>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold">{person.name.split(' ')[0]}</p>
                    </div>
                  </div>

                  {
                    i !== data.length - 1 && (
                      <div className="flex items-center">
                        <svg className={`w-5 h-5 ${person.id < current.id ? "text-indigo-500" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
            <div className="flex items-center">
              {
                canSubmit ? (
                  <div className="text-lg font-semibold select-none cursor-pointer" onClick={goHome}>Save & Exit</div>
                ) : (
                  <div className="text-lg font-semibold select-none cursor-pointer" onClick={goHome}>Exit</div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    
      <div className="p-4 flex flex-col">
        <div className="select-none text-left">
          <p className="font-semibold opacity-40 text-sm">{getDate()}</p>
          <p className="text-2xl font-bold opacity-70">Peer Evaluation Form</p>
        </div>

        <div className="mt-4 flex flex-col h-full p-2 -ml-1 rounded-xl bg-gray-100">
          <p className="text-lg font-semibold opacity-80">How do you think the team is performing?</p>
          <p className="text-sm opacity-80">Please complete the form by the given deadline.</p>
        </div>

        <div className="mt-4 flex flex-col h-full">
          <p className="text-xl font-semibold">Team Member {current.id + 1}: {current.name}</p>
        </div>

        <div className="mt-4 h-full">
          <p className="font-semibold inline-block mr-2">1. This person is leading the discussions and contributing ideas to the project your team is working on.</p>
          <p className="text-sm opacity-70 inline-block">1 = Under-performing, 2 = Average, 3 = Excellent performance.</p>
        </div>

        <div className="mt-4 flex flex-row h-full space-x-2">
          {
            [1, 2, 3].map((num: number) => (
              <div key={num} className={`select-none border-2 px-8 py-1 rounded-xl ${current.q1 == num ? "border-indigo-500" : ""}`} onClick={() => {
                let newData = data;
                newData[current.id] = { ...data[current.id], q1: num }
                setData(newData)
                setCurrent(newData[current.id])
              }}>
                {num}
              </div>
            ))
          }
        </div>

        <div className="mt-4 flex flex-col h-full">
          <p className="font-semibold">Please explain your rating for the question above.</p>
        </div>

        <div className="mt-4 flex flex-col h-full">
          <textarea className="border rounded-xl w-full h-32 p-2" onChange={(e) => {
            let newData = data;
            newData[current.id] = { ...data[current.id], q2: e.target.value }
            setData(newData)
            setCurrent(newData[current.id])
          }} value={current.q2 || ""}></textarea>
        </div>

        <div className="mt-4 h-full">
          <p className="font-semibold inline-block mr-2">2. This person is involved in conversations and following the deadlines and requirements set up by your team.</p>
          <p className="text-sm opacity-70 inline-block">1 = Under-performing, 2 = Average, 3 = Excellent performance.</p>
        </div>

        <div className="mt-4 flex flex-row h-full space-x-2">
          {
            [1, 2, 3].map((num: number) => (
              <div key={num} className={`select-none border-2 px-8 py-1 rounded-xl ${current.q3 == num ? "border-indigo-500" : ""}`} onClick={() => {
                let newData = data;
                newData[current.id] = { ...data[current.id], q3: num }
                setData(newData)
                setCurrent(newData[current.id])
              }}>
                {num}
              </div>
            ))
          }
        </div>

        <div className="mt-4 flex flex-col h-full">
          <p className="font-semibold">Please explain your rating for the question above.</p>
        </div>

        <div className="mt-4 flex flex-col h-full">
          <textarea className="border rounded-xl w-full h-32 p-2" onChange={(e) => {
            let newData = data;
            newData[current.id] = { ...data[current.id], q4: e.target.value }
            setData(newData)
            setCurrent(newData[current.id])
          }} value={current.q4 || ""}></textarea>
        </div>
      </div>
    </div>
  )
}