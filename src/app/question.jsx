import React, { useState, useEffect } from 'react';
import questionsData from './question_data.json';
import "./question.css";

const QuestionComponent = ({ onCorrectAnswer, onIncorrectAnswer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const randomQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
    setCurrentQuestion(randomQuestion);
  }, []);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);

    if (option === currentQuestion.correct_option) {
      if (onCorrectAnswer) onCorrectAnswer(); // Appelle le callback pour la bonne réponse
    } else {
      if (onIncorrectAnswer) onIncorrectAnswer(); // Appelle le callback pour la mauvaise réponse
    }
  };

  if (!currentQuestion) {
    return <p>Chargement de la question...</p>;
  }

  return (
    <div className="question-container">
      <h2 className="question-text">{currentQuestion.question}</h2>
      <ul className="choices-list">
        {currentQuestion.choices.map((choice) => (
          <li key={choice.option} className="choice-item">
            <label>
              <input
                type="radio"
                name="answer"
                value={choice.option}
                checked={selectedAnswer === choice.option}
                onChange={() => handleAnswerSelect(choice.option)}
              />
              <span className="choice-text">{choice.option}: {choice.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionComponent;