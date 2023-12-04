// teams-and-students.tsx

import React, { useState, useEffect } from "react";

interface Team {
  teamId: number;
  teamName: string;
  students: Array<Student>;
}

interface Student {
  studentId: number;
  studentName: string;
}

const TeamsAndStudents: React.FC = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);

  useEffect(() => {
    // Fetch the teams and students data from your backend server here
    // and set the `teams` state variable accordingly.
  }, []);

  return (
    <div>
      <h1>Teams and Students</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamId}>
              <td>{team.teamId}</td>
              <td>{team.teamName}</td>
              <td>
                <ul>
                  {team.students.map((student) => (
                    <li key={student.studentId}>{student.studentName}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsAndStudents;
