// evaluation form outline for students

import React, { useState } from "react";

interface EvaluationForm {
  question: string;
  feedback: string;
}

const EvaluationForm: React.FC = () => {
  const [formData, setFormData] = useState<EvaluationForm>({
    question: "",
    feedback: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="question"
        placeholder="Question"
        value={formData.question}
        onChange={handleChange}
      />
      <textarea
        name="feedback"
        placeholder="Your feedback"
        value={formData.feedback}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EvaluationForm;
