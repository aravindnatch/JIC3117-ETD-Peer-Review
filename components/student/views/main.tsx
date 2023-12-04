import { BiCog, BiPlus, BiRightArrowAlt } from 'react-icons/bi'

export default function Main({userData, setAddCourse, setReviewing}: any) {
  const findUserTeamAndEvalStatus = (course: any) => {
    const userTeam = course.teams.find((team: any) => team.members.some((member: any) => member.username === userData.username));
    if (!userTeam) {
      return { name: 'No Team', members: [], hasCompletedEval: false };
    }
    const hasCompletedEval = userTeam.members.some((member: any) => member.username === userData.username && member.evaluation);
    return { ...userTeam, hasCompletedEval };
  }

  const handleReviewing = (course: any) => {
    const userTeam = findUserTeamAndEvalStatus(course);
    const newCourse = { ...course, teams: [userTeam] };
    setReviewing(newCourse);
  }

  return (
    <>
      <div className="p-8 flex flex-col">
        <div className="select-none text-left justify-between flex flex-row border-b pb-2 items-center">
          <p className="text-2xl font-bold">Your Teams</p>
          <div className="flex flex-row items-center rounded-xl px-2" onClick={() => setAddCourse(true)}>
            <p className="font-semibold cursor-pointer opacity-80">Add Team</p>
            <BiPlus className="ml-1 text-lg cursor-pointer" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-4">
          {
            userData.courses?.map((course: any) => {
              const { name, members, hasCompletedEval } = findUserTeamAndEvalStatus(course);

              let buttonText = "Complete Peer Evaluation";
              if (name === 'No Team') {
                buttonText = "No Peer Evaluation Available";
              } else if (hasCompletedEval) {
                buttonText = "Redo Peer Evaluation";
              }

              return (
                <div className="mt-4 flex flex-col h-full border rounded-xl p-4">
                  <div className="flex flex-row justify-between items-center h-full px-1 mb-3">
                    <div className="w-full">
                      <div className="flex flex-row justify-between items-center">
                        <p className="font-semibold">{course.name}</p>
                        <BiCog className="text-xl opacity-80" />
                      </div>
                      <div className="flex flex-col space-y-2 mt-4">
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm opacity-80">Team Name: {name}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm opacity-80">Members: {members.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleReviewing(course)} disabled={name == "No Team"} className={`hover:opacity-80 mt-1 rounded-xl flex justify-between items-center cursor-pointer py-2.5 px-5 select-none border ${buttonText.includes("Redo") ? "border-green-100 bg-green-100" : "border-red-100 bg-red-100"} disabled:opacity-50 disabled:border-gray-400 disabled:bg-transparent disabled:cursor-not-allowed`}>
                    <div className="text-sm font-semibold">
                      {buttonText}
                    </div>
                    <div className="text-xl">
                      <BiRightArrowAlt />
                    </div>
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}