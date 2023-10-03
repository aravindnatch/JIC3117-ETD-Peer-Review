import { useState } from 'react'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'
import AddCourse from './modals/addCourse'

import Head from 'next/head'

export default function Instructor(userData: any) {
  const [ addCourse, setAddCourse ] = useState(false)
  const { data } = userData

  return (
    <>
      {
        addCourse && (
          <AddCourse setAddCourse={setAddCourse} />
        )
      }
      <div className="flex min-h-screen flex-col">
        <Head>
          <title>Instructor Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex w-full justify-center border-b">
          <div className="flex w-full h-16 items-center justify-between px-5 align-center">
            <div className="flex flex-row space-x-4 h-full align-middle items-center justify-center">
              <div className={`select-none flex text-md cursor-pointer h-full`}>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">Effective Team Dynamics Tool</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
              <div className="flex items-center">
                <div className="font-medium opacity-70 select-none">{data.name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 flex flex-col">
          <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
            <p className="text-2xl font-bold opacity-70">Your Courses</p>
            <div className="flex flex-row items-center" onClick={() => setAddCourse(true)}>
              <p className="font-semibold opacity-70 cursor-pointer">Add Course</p>
              <BiPlus className="ml-1 text-lg cursor-pointer" />
            </div>
          </div>

          <div className="md:grid md:grid-cols-3 gap-4">
            {
              data.courses.map((course: any) => (
                <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
                  <div className="flex flex-row justify-between items-center h-full">
                    <div>
                      <p className="font-semibold">{course.name}</p>
                      <div className="flex flex-col space-y-2 mt-4">
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm opacity-80">Students: {course.students.length}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm opacity-80">Teams: {course.teams?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <IoIosArrowDroprightCircle className="text-4xl cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}