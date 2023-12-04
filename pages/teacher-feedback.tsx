import React, { useState, useEffect } from 'react';
import { useData } from '@contexts/data-context'
import { useRouter } from 'next/router'
import Head from 'next/head'

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

interface FeedbackFormState {
  studentId: number;
  studentName: string;
  feedback: string;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useTeacherFeedback = (): FetchState<TeacherFeedback> => {
  const [state, setState] = useState<FetchState<TeacherFeedback>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/teacher-feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: TeacherFeedback = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error instanceof Error ? error.message : String(error) });
      }
    };

    fetchData();
  }, []);

  return state;
};

const FeedbackForm: React.FC<{ onSubmit: (feedback: FeedbackFormState) => Promise<void> }> = ({ onSubmit }) => {
  const [newFeedback, setNewFeedback] = useState<FeedbackFormState>({ studentId: 0, studentName: '', feedback: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(newFeedback);
    setNewFeedback({ studentId: 0, studentName: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs and buttons */}
    </form>
  );
};

const TeacherFeedbackComponent: React.FC = () => {
  const { data, loading, error } = useTeacherFeedback();

  const handleNewFeedbackSubmit = async (feedback: FeedbackFormState) => {
    // Logic to submit the new feedback (e.g., POST request to the server)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div>
      <h1>Teacher Feedback</h1>
      <FeedbackForm onSubmit={handleNewFeedbackSubmit} />
      {/* Table displaying feedback */}
    </div>
  );
};

export default TeacherFeedbackComponent;;