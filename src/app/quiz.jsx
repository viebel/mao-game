import React, { useState } from 'react';
import Question from './Question';
import Bravo from './Bravo';
import GameOver from './GameOver';

const Quiz = ({onCorrectAnswer, onIncorrectAnswer}) => {
  const [showBravo, setShowBravo] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const handleCorrectAnswer = () => {
    setShowBravo(true);
    setShowGameOver(false);
    onCorrectAnswer();
  };

  const handleIncorrectAnswer = () => {
    setShowGameOver(true);
    setShowBravo(false);
    onIncorrectAnswer();
  };

  return (
    <div>
      {showBravo && <Bravo />}
      {showGameOver && <GameOver />}
      {!showBravo && !showGameOver && (
        <Question
          onCorrectAnswer={handleCorrectAnswer} 
          onIncorrectAnswer={handleIncorrectAnswer} 
        />
      )}
    </div>
  );
};

export default Quiz;