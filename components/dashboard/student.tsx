import type { NextPage } from 'next'
import Head from 'next/head'

const Student: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Student Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Student Dashboard</p>
      </div>
    </div>
  )
}

export default Student