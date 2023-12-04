import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

export default function Onboarding() {
  const [ cookies ] = useCookies(['userData'])
  const [ name, setName ] = useState('')
  const [ role, setRole ] = useState('student')

  const handleSubmit = () => {
    if (!name) return;
    if (role !== 'student' && role !== 'instructor') return;

    axios.post('/api/user/onboarding', 
      {
        name,
        role
      },
      {
        headers: {
          'Authorization': cookies.userData.token
        }
      }
    ).then((res) => {
      window.location.replace('/app')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-full">
      <Head>
        <title>Onboarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <div className="">
          <p className="mb-5 font-semibold">You are a new user, enter details below:</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name2222"
                className="mt-1 p-2 w-full border rounded-md" 
                placeholder="Enter your name" 
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select 
                id="role" 
                name="role" 
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <div onClick={handleSubmit} className="w-full bg-gray-200 rounded-xl px-2 py-0.5 cursor-pointer text-center">
              Finish Creating Account
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}