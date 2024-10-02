import React from 'react';
// import './Result.css';



function Result({ score, result }) {
  const resultClass = result === 'Pass' ? 'result-pass' : 'result-fail';

  return (
    <div>
      <h3>Exam Result</h3>
      <p>Your Score: {score.toFixed(2)}%</p>
      <p className={resultClass}>Result: {result}</p>
      {result === 'Pass' ? (
        <p className="result-pass">Congratulations! You have passed the exam.</p>
      ) : (
        <p className="result-fail">Unfortunately, you did not pass. Please try again.</p>
      )}
    </div>
  );
}

export default Result;
