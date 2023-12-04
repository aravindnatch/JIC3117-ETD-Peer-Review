import { useState } from 'react'
import { BiChevronLeft, BiCog, BiPlus, BiRightArrowAlt } from 'react-icons/bi'
import { AiOutlineSave, AiOutlineSetting } from 'react-icons/ai'
import { BsPersonPlus } from 'react-icons/bs'
import AddTeam from '../modals/addTeam'
import AddStudent from '../modals/addStudent'
import toast from "react-hot-toast"
import BottomBar from '../modals/bottomBar'
import AddToTeam from '../modals/addToTeam'

interface CourseViewProps {
  active: any
  setActive: any
  setEvalView: any
}

export default function CourseView({active, setActive, setEvalView}: CourseViewProps) {
  const [ addTeam, setAddTeam ] = useState(false)
  const [ addStudent, setAddStudent ] = useState(false)
  const [ addToTeam, setAddToTeam ] = useState(false)
  const [ selected, setSelected ] = useState<any>([]);

  const handleInvite = () => {
    toast.success("Invite code copied to clipboard!")
    navigator.clipboard.writeText(active._id)
  }

  const handleCheckboxChange = (studentUsername: any) => {
    if (selected.includes(studentUsername)) {
      setSelected((prevCheckedStudents: any) =>
        prevCheckedStudents.filter((username: any) => username !== studentUsername)
      );
    } else {
      setSelected((prevCheckedStudents: any) => [...prevCheckedStudents, studentUsername]);
    }
  };

  const findTeamNameByUsername = (username: string) => {
    for (let team of active.teams) {
      if (team.members.some((member: any) => member.username === username)) {
        return team.name;
      }
    }
    return 'Not Assigned';
  }

  const calculateCompletionPercentage = (team: any) => {
    const membersWithEvaluation = team.members.filter((member: any) => member.evaluation !== undefined);
    return (membersWithEvaluation.length / team.members.length) * 100;
  }

  return (
    <>
      {
        addTeam && (
          <AddTeam docID={active._id} setAddTeam={setAddTeam} />
        )
      }
      {
        addStudent && (
          <AddStudent docID={active._id} setAddStudent={setAddStudent} />
        )
      }
      {
        addToTeam && (
          <AddToTeam docID={active._id} team={active.teams} selected={addToTeam} setAddToTeam={setAddToTeam} />
        )
      }
      <div className="px-8 pt-4 z-50">
        <div className="flex justify-between">
          <div>
            <div className="flex flex-row items-center">
              <div onClick={() => {setActive(null)}}>
                <BiChevronLeft className="text-2xl cursor-pointer" />
              </div>
              <div className="text-xl font-bold">
                {active.name}
              </div>
            </div>
            <div className="text-sm opacity-80 ml-2 mt-1">
              Here is a quick overview of your teams and students.
            </div>
          </div>
          <div className="flex flex-row">
            <div onClick={handleInvite} className="flex flex-col space-x-2 mr-2 mb-3" title='add'>
              <div className="border-2 rounded-xl flex items-center cursor-pointer">
                <div className="flex flex-row justify-between items-center p-2 hover:opacity-60 opacity-80">
                  <BsPersonPlus className="inline" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-x-2 mr-2 mb-3">
              <div className="border-2 rounded-xl flex items-center cursor-pointer">
                <div className="flex flex-row justify-between items-center p-2 hover:opacity-60 opacity-80">
                  <AiOutlineSave className="inline" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-x-2 mb-3">
              <div className="border-2 rounded-xl flex items-center cursor-pointer">
                <div className="flex flex-row justify-between items-center p-2 hover:opacity-60 opacity-80">
                  <AiOutlineSetting className="inline" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 py-8 ml-1 flex flex-col">
        <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
          <p className="text-xl font-semibold opacity-80">Teams</p>
          <div className="flex flex-row items-center" onClick={() => setAddTeam(true)}>
            <p className="font-semibold opacity-70 cursor-pointer">Add a Team</p>
            <BiPlus className="ml-1 text-lg cursor-pointer" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-4">
          {
            active.teams.map((team: any) => (
              <div key={team.name} className="mt-4 flex flex-col h-full border rounded-xl p-4">
                <div className="flex flex-row justify-between items-center h-full px-1 mb-3">
                  <div className="w-full">
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-semibold">{team.name}</p>
                      <BiCog className="text-xl opacity-80" />
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm opacity-80">Students: {team.members.length}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm opacity-80">Completion: {calculateCompletionPercentage(team).toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div onClick={() => setEvalView({team, course: active})}  className="hover:opacity-80 mt-1 rounded-xl flex justify-between items-center cursor-pointer py-2.5 px-5 select-none border">
                  <div className="text-sm font-semibold">
                    View Team
                  </div>
                  <div className="text-xl">
                    <BiRightArrowAlt />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="p-8 py-4 ml-1 flex flex-col">
        <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
          <p className="text-xl font-semibold opacity-80">Students</p>
          <div className="flex flex-row items-center" onClick={() => setAddStudent(true)}>
            <p className="font-semibold opacity-70 cursor-pointer">Add Students</p>
            <BiPlus className="ml-1 text-lg cursor-pointer" />
          </div>
        </div>

        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left w-0"></th>
              <th className="border px-4 py-2 text-left">Username</th>
              <th className="border px-4 py-2 text-left">Team Name</th>
            </tr>
          </thead>
          <tbody>
            {active.students.map((student: any) => (
              <tr key={student.username}>
                <td className="border px-4 py-2 text-sm w-min">
                  <input
                    type="checkbox"
                    checked={selected.includes(student.username)}
                    onChange={() => handleCheckboxChange(student.username)}
                    className="text-indigo-500 my-2 rounded focus:ring-0 focus:ring-offset-0"
                  />
                </td>
                <td className="border px-4 py-2 text-sm">{student.username}</td>
                <td className="border px-4 py-2 text-sm">{findTeamNameByUsername(student.username)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        selected.length > 0 && !addToTeam && (
          <BottomBar 
            selected={selected}
            setAddToTeam={setAddToTeam}
            docID={active._id}
          />
        )
      }
    </>
  )
}