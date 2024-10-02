import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function TakeExam() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchExam = async () => {
      if (!examId) {
        setError('Exam ID is missing.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8990/api/exam/${examId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExam(response.data);
      } catch (error) {
        console.error('Failed to load exam', error.response?.data || error.message);
        setError('Failed to load exam.');
      }
    };

    fetchExam();
  }, [examId]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8000/api/submit_exam/', {
        exam_id: exam.id,
        answers,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResult(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit exam', error.response?.data || error.message);
      setError('Failed to submit exam.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {exam ? (
        <form onSubmit={handleSubmit}>
          <h2>{exam.title}</h2>
          {exam.questions.map((question) => (
            <div key={question.id}>
              <p>{question.text}</p>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" disabled={isSubmitting || submitted}>
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </form>
      ) : (
        <p>Loading exam...</p>
      )}

      {submitted && result && (
        <div>
          <h3>Result</h3>
          <p>Score: {result.score}</p>
          <p>Result: {result.result}</p>
        </div>
      )}
    </div>
  );
}

export default TakeExam;
