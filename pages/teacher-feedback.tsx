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

const FeedbackForm: React.FC<{ onSubmit: (feedback: FeedbackItem) => void }> = ({ onSubmit }) => {
  const [newFeedback, setNewFeedback] = useState<FeedbackItem>({
    feedbackId: 0, 
    studentId: 0,
    studentName: '',
    feedback: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newFeedback);
    setNewFeedback({ ...newFeedback, studentId: 0, studentName: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Student ID"
        value={newFeedback.studentId}
        onChange={(e) => setNewFeedback({ ...newFeedback, studentId: parseInt(e.target.value, 10) })}
        required
      />
      <input
        type="text"
        placeholder="Student Name"
        value={newFeedback.studentName}
        onChange={(e) => setNewFeedback({ ...newFeedback, studentName: e.target.value })}
        required
      />
      <textarea
        placeholder="Feedback"
        value={newFeedback.feedback}
        onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

const TeacherFeedbackComponent: React.FC = () => {
  const { data, loading, error } = useTeacherFeedback();

  const handleNewFeedbackSubmit = (feedbackItem: FeedbackItem) => {
    console.log('Submitting new feedback:', feedbackItem);
    // Add logic to send this to the server
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div>
      <h1>Teacher Feedback</h1>
      <FeedbackForm onSubmit={handleNewFeedbackSubmit} />
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