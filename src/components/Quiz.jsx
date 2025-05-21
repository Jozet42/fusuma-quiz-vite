import React from 'react'
import './Quiz.css';
import fusumaL from '../assets/images/frame/fusuma-L.jpg';
import fusumaR from '../assets/images/frame/fusuma-R.jpg';
import fusumaB from '../assets/images/frame/fusuma-B.jpg';



const Quiz = ({
    currentQuestion,
    correctAnswer,
    showChoices,
    onAnswer,
    isAnswered,
    answer,
    result,
    onNext,
    isLast,
    screenState,
    scrollActive,
    setScreenState,
    setShowChoices,
    rotationDegree
}) => {
    return (
        <>
            <div
                className={`quiz-frame ${screenState}`}
                onTransitionEnd={() => {
                    if (screenState.startsWith('closing')) {
                        setShowChoices(true); // ← 襖が閉じた後に選択肢を出す！
                    }
                }}
                style={{
                    backgroundImage: `url(${fusumaB})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className={`scroll-area ${scrollActive ? 'active' : ''}`}
                    onAnimationEnd={() => setScreenState('closing')}
                    key={correctAnswer}
                >
                    <img
                        src={`/images/questions/${correctAnswer}.png`}
                        alt="問題画像"
                        style={{ transform: `rotate(${rotationDegree}deg)` }}
                    />
                </div>
                <img src={fusumaL} className="fusuma left" alt="/" />
                <img src={fusumaR} className="fusuma right" alt="/" />
            </div>

            {showChoices && currentQuestion && (
                <div className="result-text">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAnswer(option)}
                            className="choice-button"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {answer && <p className="result-text">{result}</p>}

            {isAnswered && (
                <button
                    onClick={() => onNext(true)}
                    className="next-button"
                >
                    {isLast ? '結果を見る' : '次へ'}
                </button>
            )}
        </>
    );
};

export default Quiz;
