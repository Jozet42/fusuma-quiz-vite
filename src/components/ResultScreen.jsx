import React from 'react';
import './ResultScreen.css';

const ResultScreen = ({ total, correctCount, onRestart }) => {
    return (
        <div className="result-screen">
            <h2>ご苦労に御座いました！！</h2>
            <p>{total}問中 {correctCount}問 正解に御座います！</p>
            <button onClick={onRestart} className="restart-button">
                もう一回！
            </button>
        </div>
    );
};

export default ResultScreen;
