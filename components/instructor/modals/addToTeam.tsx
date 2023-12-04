import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from 'axios'
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

interface ModalProps {
  team: any;
  selected: any;
  setAddToTeam: any;
  docID: any;
}

function closeModal(e: any, setAddToTeam: any) {
  if (e.target == e.currentTarget){
    e.stopPropagation()
    setAddToTeam(false);
  }
}

export default function AddToTeam({ team, selected, setAddToTeam, docID }: ModalProps) {
  const [ cookies ] = useCookies(['userData']);
  const [ pressed, setPressed ] = useState(false)
  const [ selectedOption, setSelectedOption ] = useState(team[0].name || "")

  function handleAdd() {
    console.log(team)
    console.log(selected)

    setPressed(true);
    axios.defaults.headers.common['Authorization'] = cookies.userData.token
    axios.post("/api/team/addStudents", {
      'name': selectedOption,
      'usernames': selected,
      'docID': docID
    }).then((res) => {
      window.location.reload()
    }).catch((err) => {
      setPressed(false);
      toast.error(err.response?.data || "internal server error")
    })
  }
  
  return createPortal (
    <div onClick={(event) => closeModal(event, setAddToTeam)} className="fixed z-10 flex justify-center items-center p-4 inset-0 h-full bg-[rgba(0,0,0,0.3)] h-modal overflow-x-hidden overflow-y-auto">
      <div className="fixed w-full max-w-md h-auto">
        <div className="relative bg-white rounded-lg">
          <div onClick={() => setAddToTeam(false)} className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>

          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-6 text-xl font-medium text-gray-900">Add a New Course</h3>
            <div className="space-y-6">
              <div>
                <div className="block mb-3 text-sm font-medium text-gray-900">
                  Team Name
                </div>
                <div>
                  <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {team?.map((o: any, i: any) => (
                      <option key={i} value={o.name}>{o.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            <button onClick={handleAdd} disabled={selectedOption == ""} className={`w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-40`}>
              {pressed ? 'Adding To Team...' : 'Add Team'}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}
