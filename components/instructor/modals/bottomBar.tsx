import { BiPlus, BiTrash } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useCookies } from "react-cookie";

interface BottomBarProps {
  selected: any;
  setAddToTeam: any;
  docID: any;
}

export default function BottomBar({ selected, docID, setAddToTeam }: BottomBarProps) {
  const [ cookies ] = useCookies(['userData']);

  const addToTeam = () => {
    setAddToTeam(selected)
  }

  const deleteStudents = () => {
    axios.defaults.headers.common['Authorization'] = cookies.userData.token
    axios.post("/api/student/delete", {
      'docID': docID,
      'usernames': selected
    }).then((res) => {
      window.location.reload()
    }).catch((err) => {
      toast.error(err.response?.data || "internal server error")
    })
  }

  return (
    <div className="absolute w-full flex bottom-7 justify-center">
      <div className="z-50 flex px-2 mx-4 md:w-1/2 w-full rounded-xl h-14 border bg-white shadow-md">
        <div className="flex w-full justify-between items-center">
          <div className="ml-4 select-none text-sm text-center">
            {selected.length} selected
          </div>
          <div className="flex flex-row md:space-x-4 mr-4">
            <div onClick={deleteStudents} className="border px-4 py-2 flex flex-row items-center cursor-pointer hover:opacity-70 p-1 pr-1 rounded-xl my-2">
              <span className="text-sm mr-2">Delete</span>
              <BiTrash className="text-lg mr-2" />
            </div>
            <div onClick={addToTeam} className="border px-4 py-2 flex flex-row items-center cursor-pointer hover:opacity-70 p-1 pr-1 rounded-xl my-2">
              <span className="text-sm mr-2">Add to Team</span>
              <BiPlus className="text-lg mr-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}