import React from "react";
import "./Card.css";

const Card = ({ correctPlayer, guessedPlayer }) => {
    document.body.style = "background: #f7f7f7;";

    const compareValue = (correct, guess) => {
        if (correct === guess) {
            return 'correct';
        }
        return correct > guess ? 'lower' : 'higher';
    };

    return (
        <div className="card">
            <div className="guess_name">
                <p className={correctPlayer.name === guessedPlayer.name ? "correct" : "incorrect"}>
                    {guessedPlayer.name}
                </p>
            </div>
            <div className="guesses">
                <div className={`guess_info ${compareValue(correctPlayer.shirtNumber, guessedPlayer.shirtNumber)}`}>
                    <p>Shirt: {guessedPlayer.shirtNumber}

                        {compareValue(correctPlayer.shirtNumber, guessedPlayer.shirtNumber) !== 'correct' && (
                            <span>  {compareValue(correctPlayer.shirtNumber, guessedPlayer.shirtNumber)}</span>
                        )}

                    </p>
                </div>
                <div className={`guess_info ${compareValue(correctPlayer.age, guessedPlayer.age)}`}>
                    <p>Age: {guessedPlayer.age}

                        {compareValue(correctPlayer.age, guessedPlayer.age) !== 'correct' && (
                            <span>  {compareValue(correctPlayer.age, guessedPlayer.age)}</span>
                        )}

                    </p>
                </div>
                <div className="guess_info">
                    <p className={correctPlayer.position === guessedPlayer.position ? "correct" : "incorrect"}>
                        Position: {guessedPlayer.position}
                    </p>
                </div>
                <div className="guess_info">
                    <p className={correctPlayer.team === guessedPlayer.team ? "correct" : "incorrect"}>
                        Team: {guessedPlayer.team}
                    </p>
                </div>
                <div className="guess_info">
                    <p className={correctPlayer.nationality === guessedPlayer.nationality ? "correct" : "incorrect"}>
                        Nationality: {guessedPlayer.nationality}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
