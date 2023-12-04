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

const fetchTeacherFeedback = async (): Promise<TeacherFeedback> => {
  const response = await fetch('/api/teacher-feedback');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
};

const useTeacherFeedback = (): FetchState<TeacherFeedback> => {
  const [state, setState] = useState<FetchState<TeacherFeedback>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTeacherFeedback();
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(newFeedback);
    setNewFeedback({ studentId: 0, studentName: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs, error messages, and buttons */}
      {/* Example error display: */}
      {errors.studentName && <div className="error">{errors.studentName}</div>}
      {/* Example error display: */}
    </form>
  );
};

const TeacherFeedbackComponent: React.FC = () => {
  const { data, loading, error } = useTeacherFeedback();

  const handleNewFeedbackSubmit = async (feedback: FeedbackFormState) => {
    // Logic to submit the new feedback
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

export default TeacherFeedbackComponent;