// Evaluation forms progress page

import React, { useState, useEffect } from "react";

interface FeedbackProgress {
  classId: string;
  className: string;
  completedStudents: number;
  totalStudents: number;
}

const FeedbackProgress: React.FC = () => {
  const [feedbackProgress, setFeedbackProgress] = useState<Array<FeedbackProgress>>([]);

  const renderProgressBar = (feedbackProgress: FeedbackProgress) => {
    const percentCompleted = (feedbackProgress.completedStudents / feedbackProgress.totalStudents) * 100;

    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentCompleted}%` }}></div>
      </div>
    );
  };

  return (
    <div>
      <h1>Feedback Progress</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Completed Students</th>
            <th>Total Students</th>
            <th>Progress Bar</th>
          </tr>
        </thead>
        <tbody>
          {feedbackProgress.map((feedbackProgress) => (
            <tr key={feedbackProgress.classId}>
              <td>{feedbackProgress.classId}</td>
              <td>{feedbackProgress.className}</td>
              <td>{feedbackProgress.completedStudents}</td>
              <td>{feedbackProgress.totalStudents}</td>
              <td>{renderProgressBar(feedbackProgress)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackProgress;
