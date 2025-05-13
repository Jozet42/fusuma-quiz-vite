import { useState, useEffect } from 'react';
import questions from '../data/questions.json';

const useQuiz = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState('');
    const [showChoices, setShowChoices] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizSet, setQuizSet] = useState([]);
    const [scrollActive, setScrollActive] = useState(false);
    const [screenState, setScreenState] = useState('closed');
    const [difficulty, setDifficulty] = useState('normal');
    const [rotationDegree, setRotationDegree] = useState(0);

    const closeCurtain = () => { setScreenState('closing'); }
    const showChoicesAfterClose = () => { setShowChoices(true); }


    const isFinished = currentQuestionIndex >= quizSet.length;
    // const currentQuestion = isFinished ? null : questions[currentQuestionIndex];
    const currentQuestion = quizSet[currentQuestionIndex];


    const shuffleAndPick = (array, count) => {
        return [...array]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    };

    const startQuiz = (selectedDifficulty = 'normal') => {
        const selectedQuestions = shuffleAndPick(questions, 5);
        setDifficulty(selectedDifficulty);
        setQuizSet(selectedQuestions);
        setIsStarted(true);
        setCurrentQuestionIndex(0);
        setCorrectCount(0);
        setAnswer(null);
        setResult('');
        setIsAnswered(false);
        setShowChoices(false);
    };

    const resetGame = () => {
        setIsStarted(false);
        setCurrentQuestionIndex(0);
        setCorrectCount(0);
        setAnswer(null);
        setResult('');
        setIsAnswered(false);
        setShowChoices(false);
    };

    const handleAnswer = (option) => {
        setAnswer(option);
        setIsAnswered(true);

        if (option === correctAnswer) {
            setResult('🎯 正解に御座います！！');
            setCorrectCount((prev) => prev + 1);
        } else {
            setResult('❌ 残念、間違いに御座います！！');
        }
    };

    const handleNext = (shouldIncrement) => {
        if (shouldIncrement) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setShowChoices(true);
        }
    };

    useEffect(() => {
        if (!isStarted || isFinished) return;

        const question = quizSet[currentQuestionIndex];
        const random = Math.floor(Math.random() * question.options.length);
        const answer = question.options[random];
        setCorrectAnswer(answer);

        let maxRotation = 5; // やさしい

        if (difficulty === 'normal') maxRotation = 90;
        if (difficulty === 'hard') maxRotation = 360;

        const randomRotation = Math.floor(Math.random() * maxRotation * 2) - maxRotation; // -X 〜 +X
        setRotationDegree(randomRotation);

        setAnswer(null);
        setResult('');
        setShowChoices(false);
        setIsAnswered(false);

        // 状態初期化
        setScrollActive(false);
        setScreenState('closed');

        // 襖を開く
        const openTimer = setTimeout(() => {
            setScreenState(`opening-${difficulty}`); // ← 襖が開き始める

            const openDoneTimer = setTimeout(() => {
                setScreenState(`open-${difficulty}`);      // ← 襖が開いた状態に遷移
                setScrollActive(true);       // ← スクロールアニメ開始
            }, 500); // 襖開く時間に合わせる（1秒想定）

            return () => clearTimeout(openDoneTimer);
        }, 300); // スタートから少し遅れて開く（0.3秒）

        return () => clearTimeout(openTimer);
    }, [currentQuestionIndex, isStarted, isFinished, quizSet, difficulty, rotationDegree]);

    return {
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
        difficulty,
        rotationDegree,
        setRotationDegree,
        setDifficulty,
        setScreenState,
        setShowChoices,
        startQuiz,
        resetGame,
        handleAnswer,
        handleNext,
        closeCurtain,
        showChoicesAfterClose
    };
};

export default useQuiz;
