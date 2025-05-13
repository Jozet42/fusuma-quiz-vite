// React Core
import React from 'react';
import { useState } from 'react';

// Components
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';

// Hooks
import useQuiz from './hooks/useQuiz';

// Data
import questions from './data/questions.json';

// Styles
import './App.css';


const App = () => {

  const [difficulty, setDifficulty] = useState('normal');

  const {
    isStarted,
    isFinished,
    currentQuestion,
    correctAnswer,
    showChoices,
    isAnswered,
    answer,
    result,
    correctCount,
    currentQuestionIndex,
    quizSet,
    screenState,
    scrollActive,
    rotationDegree,
    setScreenState,
    setShowChoices,
    startQuiz,
    resetGame,
    handleAnswer,
    handleNext
  } = useQuiz();

  return (
    <div className='app-container'>
      <h1 className="title">瞬きふすま問答</h1>

      {!isStarted ? (
        <StartScreen
          onStart={() => startQuiz(difficulty)}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : isFinished ? (
        <ResultScreen total={quizSet.length} correctCount={correctCount} onRestart={resetGame} />
      ) : (
        <Quiz
          currentQuestion={currentQuestion}
          correctAnswer={correctAnswer}
          showChoices={showChoices}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          answer={answer}
          result={result}
          onNext={handleNext}
          isLast={currentQuestionIndex === questions.length - 1}
          screenState={screenState}
          scrollActive={scrollActive}
          setScreenState={setScreenState}
          setShowChoices={setShowChoices}
          difficulty={difficulty}
          rotationDegree={rotationDegree}
        />
      )}
    </div>
  );
};

export default App;
