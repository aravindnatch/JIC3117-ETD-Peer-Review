import type { NextPage } from 'next'
import Head from 'next/head'

const Teacher: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Teacher Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Teacher Dashboard</p>
      </div>
    </div>
  )
}

export default Teacher