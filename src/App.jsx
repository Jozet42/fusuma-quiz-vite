// React Core
import React, { useState, useEffect } from 'react';

// Components
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import Loading from './components/Loading';

// Hooks
import useQuiz from './hooks/useQuiz';

// Data
import questions from './data/questions.json';

// Styles
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // 初回ロード用 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 任意で調整OK（0.5〜1秒）

    return () => clearTimeout(timer);
  }, []);

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
    isQuizLoading,
    setScreenState,
    setShowChoices,
    startQuiz,
    resetGame,
    handleAnswer,
    handleNext
  } = useQuiz();

  // ローディング中は表示切り替え
  if (isLoading || isQuizLoading) {
    return <Loading />;
  }

  // 画面描画本体
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
        <ResultScreen
          total={quizSet.length}
          correctCount={correctCount}
          onRestart={resetGame}
        />
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
