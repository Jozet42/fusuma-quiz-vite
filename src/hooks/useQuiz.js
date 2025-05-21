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
    const [isQuizLoading, setIsQuizLoading] = useState(false);

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

        console.log('🌀 クイズローディング開始');
        setIsQuizLoading(true);

        const question = quizSet[currentQuestionIndex];
        if (!question) return;

        const random = Math.floor(Math.random() * question.options.length);
        const answer = question.options[random];
        setCorrectAnswer(answer);

        let maxRotation = 5;
        if (difficulty === 'normal') maxRotation = 90;
        if (difficulty === 'hard') maxRotation = 360;
        const randomRotation = Math.floor(Math.random() * maxRotation * 2) - maxRotation;
        setRotationDegree(randomRotation);

        setAnswer(null);
        setResult('');
        setShowChoices(false);
        setIsAnswered(false);
        setScrollActive(false);
        setScreenState('closed');

        // 💡このタイミングでローディング終了！
        setTimeout(() => {
            setIsQuizLoading(false);
            console.log('🟢 レイアウト安定 → ローディング解除');
        }, 100); // 遅延入れとくと安心（0.1秒くらい）
    }, [currentQuestionIndex, isStarted, isFinished, quizSet, difficulty]);

    useEffect(() => {
        if (!isStarted || isFinished || isQuizLoading) return;

        console.log('✨ 襖演出スタート');

        const openTimer = setTimeout(() => {
            setScreenState(`opening-${difficulty}`);

            const openDoneTimer = setTimeout(() => {
                setScreenState(`open-${difficulty}`);
                setScrollActive(true);
                console.log('✅ 襖オープン完了');
            }, 500);

            return () => clearTimeout(openDoneTimer);
        }, 300);

        return () => clearTimeout(openTimer);
    }, [isStarted, isFinished, isQuizLoading, difficulty]);


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
        isQuizLoading,
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
