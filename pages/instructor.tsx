import { useData } from '@contexts/data-context'
import { useEffect } from 'react'
import Head from 'next/head'

export default function Instructor() {
  const { data } = useData()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Instructor Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Instructor Dashboard</p>
      </div>
    </div>
  )
}