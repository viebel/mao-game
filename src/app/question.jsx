import React, { useState, useEffect, useRef } from 'react';
import questionsData from './question_data.json';
import "./question.css";
import HourGlass from './hourglass';

const QuestionComponent = ({ onCorrectAnswer, onIncorrectAnswer }) => {
    const hourGlassRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        console.log('onIncorrectAnswer', onIncorrectAnswer);

        const randomQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
        setCurrentQuestion(randomQuestion);
    }, []);

    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);

        if (option === currentQuestion.correct_option) {
            if (onCorrectAnswer) onCorrectAnswer(); 
        } else {
            if (onIncorrectAnswer) onIncorrectAnswer(); 
        }
    };

    if (!currentQuestion) {
        return <p>Chargement de la question...</p>;
    }
    
    return (
        <div className="question-container">
            <h2 className="question-text">{currentQuestion.question}</h2>
            <div className="content-wrapper">
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
                <HourGlass ref={hourGlassRef} size={5} duration={10} onEnd={onIncorrectAnswer}></HourGlass>
            </div>
        </div>
    );
};

export default QuestionComponent;