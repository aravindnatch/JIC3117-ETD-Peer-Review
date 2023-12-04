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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated data fetching
        const response = await fetch("/api/teacher-feedback"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const feedbackData = await response.json();

        setTeacherFeedback(feedbackData);
      } catch (error) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Teacher Feedback</h1>
        <div>Error: {error}</div>
      </div>
    );
  }

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