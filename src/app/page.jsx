'use client';
import NonClickableDie from "./non_clickable_die";
import ClickableDie from "./clickable_die";
import HourGlass from "./hourglass";
import React, { useRef } from "react";
import confetti from "canvas-confetti";
import Quiz from "./quiz";


function randomDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomDice(numberOfDice) {
  return Array.from({ length: numberOfDice }, () => randomDie());
}

const isSolutionCorrect = (updatedDice, target) => {
  const activeDice = updatedDice.filter(die => die.isActive);
  return activeDice.length === 1 && activeDice[0].value === target;
};

const checkSolution = (dice, target) => {
  if (isSolutionCorrect(dice, target)) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};

export default function Home() {
  const numberOfDice = 5;
  const maxTarget = 100;
  const [initialDice, setInitialDice] = React.useState(randomDice(numberOfDice));
  const [dice, setDice] = React.useState(initialDice.map((value, index) => ({ value, isActive: true, index })));
  const [currentResult, setCurrentResult] = React.useState(0);
  const [selectedNumber, setSelectedNumber] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [target, setTarget] = React.useState(Math.floor(Math.random() * maxTarget) + 1);
  const [history, setHistory] = React.useState([]);

  const saveState = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        dice: [...dice],
        currentResult,
        selectedNumber,
        operator,
        target,
      }
    ]);
  };

  const addDie = () => {
    const newDieValue = randomDie();
    const newDie = { value: newDieValue, isActive: true, index: dice.length };
    setDice([...dice, newDie]);
    setInitialDice([...initialDice, newDieValue]);
  };


  const undoLastOperation = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setDice(previousState.dice);
      setCurrentResult(previousState.currentResult);
      setSelectedNumber(null);
      setOperator(null);
      setTarget(previousState.target);
      setHistory(history.slice(0, -1));
    }
  };

  const handleDieClick = (value, index) => {
    if (selectedNumber === null || operator === null) {
      setSelectedNumber({ value, index });
    } else if (operator !== null) {
      const m = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '×': (a, b) => a * b,
        '÷': (a, b) => a / b
      };
      const result = m[operator](selectedNumber.value, value);
      const newDice = dice.map((die) => {
        if (die.index === selectedNumber.index) {
          return { value: result, isActive: true, index: die.index };
        }
        if (die.index === index) {
          return { ...die, isActive: false };
        }
        return die;
      });
      saveState();
      setDice(newDice);
      setSelectedNumber({ value: result, index: selectedNumber.index });
      setOperator(null);
      checkSolution(newDice, target);
    }
  };

  const handleOperatorClick = (selectedOperator) => {
    if (selectedNumber) {
      setOperator(selectedOperator);
    }
  };

  const onTimerEnd = () => {
    console.log('Hourglass ended');
  };

  const resetGame = () => {
    const newInitialDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    setInitialDice(newInitialDice);
    setDice(newInitialDice.map((value, index) => ({ value, isActive: true, index })));
    setCurrentResult(0);
    setSelectedNumber(null);
    setOperator(null);
    setTarget(Math.floor(Math.random() * 100) + 1);
    setHistory([]);
  };

  const resetDiceState = () => {
    setDice(initialDice.map((value, index) => ({ value, isActive: true, index })));
    setCurrentResult(0);
    setSelectedNumber(null);
    setOperator(null);
    setHistory([]);
  };

  const restartTimer = () => {
    console.log('Restarting the timer', hourGlassRef.current);
    hourGlassRef.current.restart();
  };

  const onCorrectAnswer = () => {
    resetDiceState();
    restartTimer();
    addDie();
  }

  const onIncorrectAnswer = () => { 
    console.log('Game over');
  };


  const hourGlassRef = useRef(null);
  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen relative">
      <div id="root" className="p-8 bg-white shadow-lg rounded-lg w-full max-w-xl">
        <canvas id="confetti-canvas" className="confetti"></canvas>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Zeugmathikon</h1>
          <div className="hourglass-container">
            <div className="target-number" onClick={resetGame}>
              {target}
            </div>
            <HourGlass ref={hourGlassRef} onEnd={onTimerEnd} size={5} duration={120}></HourGlass>
          </div>
          <div className="dice-container">
            {initialDice.map((value, index) => (
              <NonClickableDie key={index} value={value} />
            ))}
          </div>

          <div className="result-container">
            {dice.map((die, index) => ClickableDie(handleDieClick, selectedNumber, die, index))}
          </div>

          <div className="flex justify-center items-center gap-2 mb-4">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/synchronize.png"
              className="icon-btn"
              onClick={resetDiceState} />

            {['+', '-', '×', '÷'].map((operator) => (
              <button key={operator} className="operator-btn" onClick={() => handleOperatorClick(operator)}>{operator}</button>
            ))}

            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/undo.png"
              className="icon-btn"
              onClick={undoLastOperation}
            />
          </div>
          <div>
            <Quiz onCorrectAnswer={onCorrectAnswer} onIncorrectAnswer={onIncorrectAnswer}></Quiz>
          </div>
        </div>
      </div>
    </div>
  );
}