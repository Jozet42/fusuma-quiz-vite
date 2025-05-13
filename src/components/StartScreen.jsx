import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart, difficulty, setDifficulty }) => {
    const handleChange = (e) => {
        setDifficulty(e.target.value);
    };

    return (
        <div className="start-screen">
            <h2 className="start-title">難易度を選んでくだされ</h2>

            <div className="difficulty-options">
                <label className={difficulty === 'easy' ? 'selected easy' : ''}>
                    <input
                        type="radio"
                        name="difficulty"
                        value="easy"
                        checked={difficulty === 'easy'}
                        onChange={handleChange}
                    />
                    🌸 梅（やさしい）
                </label>

                <label className={difficulty === 'normal' ? 'selected normal' : ''}>
                    <input
                        type="radio"
                        name="difficulty"
                        value="normal"
                        checked={difficulty === 'normal'}
                        onChange={handleChange}
                    />
                    🎋 竹（ふつう）
                </label>

                <label className={difficulty === 'hard' ? 'selected hard' : ''}>
                    <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={difficulty === 'hard'}
                        onChange={handleChange}
                    />
                    🎍 松（むずかしい）
                </label>
            </div>


            <button onClick={onStart} className="start-button">
                始め！！
            </button>
        </div>
    );
};

export default StartScreen;
