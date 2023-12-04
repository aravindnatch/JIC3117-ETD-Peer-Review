// student-feedback.tsx

import React, { useState, useEffect } from "react";

interface StudentFeedback {
  studentId: number;
  studentName: string;
  feedbackGiven: Array<FeedbackItem>;
  feedbackReceived: Array<FeedbackItem>;
}

interface FeedbackItem {
  feedbackId: number;
  feedbackGiverId: number;
  feedbackGiverName: string;
  feedback: string;
}

const StudentFeedback: React.FC = () => {
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedback | null>(null);

  if (studentFeedback === null) {
    return (
      <div>
        <h1>Student Feedback</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Student Feedback</h1>
      <h2>Feedback Given</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Feedback Giver</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {studentFeedback.feedbackGiven.map((feedbackItem) => (
            <tr key={feedbackItem.feedbackId}>
              <td>{feedbackItem.feedbackId}</td>
              <td>{feedbackItem.feedbackGiverName}</td>
              <td>{feedbackItem.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Feedback Received</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Feedback Giver</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {studentFeedback.feedbackReceived.map((feedbackItem) => (
            <tr key={feedbackItem.feedbackId}>
              <td>{feedbackItem.feedbackId}</td>
              <td>{feedbackItem.feedbackGiverName}</td>
              <td>{feedbackItem.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentFeedback;
