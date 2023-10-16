// teacher-feedback.tsx

import React, { useState, useEffect } from "react";

interface TeacherFeedback {
  teacherId: number;
  teacherName: string;
  feedbackGiven: Array<FeedbackItem>;
}

interface FeedbackItem {
  feedbackId: number;
  studentId: number;
  studentName: string;
  feedback: string;
}

const TeacherFeedback: React.FC = () => {
  const [teacherFeedback, setTeacherFeedback] = useState<TeacherFeedback | null>(null);

  // Simulate fetching teacher feedback data from an API or database
  useEffect(() => {
    // Replace this with actual data fetching logic
    const fetchData = async () => {
      // Simulated data
      const feedbackData = {
        teacherId: 1,
        teacherName: "John Doe",
        feedbackGiven: [
          {
            feedbackId: 1,
            studentId: 101,
            studentName: "Alice",
            feedback: "Good",
          },
          {
            feedbackId: 2,
            studentId: 102,
            studentName: "Bob",
            feedback: "Bad",
          },
        ],
      };

      setTeacherFeedback(feedbackData);
    };

    fetchData();
  }, []);

  if (teacherFeedback === null) {
    return (
      <div>
        <h1>Teacher Feedback</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Teacher Feedback</h1>
      <h2>Feedback Given</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Student</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {teacherFeedback.feedbackGiven.map((feedbackItem) => (
            <tr key={feedbackItem.feedbackId}>
              <td>{feedbackItem.feedbackId}</td>
              <td>{feedbackItem.studentName}</td>
              <td>{feedbackItem.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherFeedback;