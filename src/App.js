import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login";
import CreateExam from "./components/CreateExam";
import TakeExam from "./components/TakeExam";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_exam" element={<CreateExam />} />
        <Route path="/take_exam/:examId" element={<TakeExam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
export default App;


