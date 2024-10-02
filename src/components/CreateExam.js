import React, { useState } from "react";
import axios from "axios";

function CreateExam() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question_text: "", options: ["", ""], correct_answer: "" },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: "", options: ["", ""], correct_answer: "" },
    ]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/create_exam/",
        {
          name: title,
          questions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Exam created successfully!");
      setTitle("");
      setQuestions([
        { question_text: "", options: ["", ""], correct_answer: "" },
      ]);
    } catch (error) {
      console.error("Error creating exam:", error.response.data);
      alert(
        "Failed to create exam: " +
          (error.response?.data?.detail || "Unknown error")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Exam</h2>
      <input
        type="text"
        placeholder="Exam Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={question.question_text}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question_text = e.target.value;
              setQuestions(newQuestions);
            }}
            required
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options[optionIndex] = e.target.value;
                setQuestions(newQuestions);
              }}
              required
            />
          ))}
          <button type="button" onClick={() => handleAddOption(index)}>
            Add Option
          </button>
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correct_answer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].correct_answer = e.target.value;
              setQuestions(newQuestions);
            }}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Create Exam</button>
    </form>
  );
}

export default CreateExam;
