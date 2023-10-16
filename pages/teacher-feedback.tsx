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

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <div>Loading...</div>
  </div>
);

const TeacherFeedback: React.FC = () => {
  const [teacherFeedback, setTeacherFeedback] = useState<TeacherFeedback | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt to retrieve data from local storage
    const cachedData = localStorage.getItem("teacherFeedbackData");

    if (cachedData) {
      setTeacherFeedback(JSON.parse(cachedData));
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          // Simulated data fetching
          const response = await fetch("/api/teacher-feedback"); // Replace with your actual API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const feedbackData = await response.json();

          // Store the data in local storage for caching
          localStorage.setItem("teacherFeedbackData", JSON.stringify(feedbackData));

          setTeacherFeedback(feedbackData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Teacher Feedback</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (teacherFeedback === null) {
    return (
      <div>
        <h1>Teacher Feedback</h1>
        <div>No data available.</div>
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