import { useData } from '@contexts/data-context'
import { FaUserCircle } from 'react-icons/fa'

export default function Nav({ name }: any) {
  const { data } = useData()

  return (
    <div className="flex w-full justify-center border-b">
      <div className="flex w-full h-16 items-center justify-between px-5 align-center">
        <div className="flex flex-row space-x-4 h-full align-middle items-center justify-center">
          <div className={`select-none flex text-md cursor-pointer h-full`}>
            <div className="flex items-center">
              <img src="/partners.png" className="h-8 w-8" />
              <p className="text-xl font-semibold ml-3">Team Dynamics</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-9 h-full align-middle items-center justify-center">
          <div className="flex items-center">
            <div className="font-medium opacity-70 select-none">{name}</div>
            <FaUserCircle className="text-2xl cursor-pointer ml-3" />
          </div>
        </div>
      </div>
    </div>
  )
}