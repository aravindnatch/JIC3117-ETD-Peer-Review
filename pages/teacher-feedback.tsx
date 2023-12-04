import React, { useState, useEffect } from 'react';

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

const useTeacherFeedback = () => {
  const [state, setState] = useState<{ data: TeacherFeedback | null; loading: boolean; error: string | null }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/teacher-feedback');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: "Error" });
      }
    };

    fetchData();

    const socket = new WebSocket('ws://your-websocket-server-url');
    socket.addEventListener('message', event => {
      const updatedData = JSON.parse(event.data);
      setState(state => ({ ...state, data: updatedData }));
    });

    return () => socket.close();
  }, []);

  return state;
};

const TeacherFeedbackComponent: React.FC = () => {
  const { data, loading, error } = useTeacherFeedback();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div>
      <h1>Teacher Feedback</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Student</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {data.feedbackGiven.map(item => (
            <tr key={item.feedbackId}>
              <td>{item.feedbackId}</td>
              <td>{item.studentName}</td>
              <td>{item.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherFeedbackComponent;