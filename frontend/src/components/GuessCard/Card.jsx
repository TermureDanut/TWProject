import React from "react";
import "./Card.css";

const Card = ({ correctPlayer, guessedPlayer }) => {
  return (
    <div className="card">
      <div>
        {correctPlayer.name === guessedPlayer.name ? (
          <div className="guess_name_correct">
            <p>{correctPlayer.name}</p>
          </div>
        ) : (
          <div className="guess_name_incorrect">
            <p>{guessedPlayer.name}</p>
          </div>
        )}
      </div>
      <div className="guesses">
        {correctPlayer.shirtNumber === guessedPlayer.shirtNumber ? (
          <div className="correct_output">
            <p>{correctPlayer.shirtNumber}</p>
          </div>
        ) : (
          <div className="incorrect_output">
            <p>{guessedPlayer.shirtNumber}</p>
          </div>
        )}

        {correctPlayer.position === guessedPlayer.position ? (
          <div className="correct_output">
            <p>{correctPlayer.position}</p>
          </div>
        ) : (
          <div className="incorrect_output">
            <p>{guessedPlayer.position}</p>
          </div>
        )}

        {correctPlayer.age === guessedPlayer.age ? (
          <div className="correct_output">
            <p>{correctPlayer.age}</p>
          </div>
        ) : (
          <div className="incorrect_output">
            <p>{guessedPlayer.age}</p>
          </div>
        )}

        {correctPlayer.team === guessedPlayer.team ? (
          <div className="correct_output">
            <p>{correctPlayer.team}</p>
          </div>
        ) : (
          <div className="incorrect_output">
            <p>{guessedPlayer.team}</p>
          </div>
        )}
        {correctPlayer.nationality === guessedPlayer.nationality ? (
          <div className="correct_output">
            <p>{correctPlayer.nationality}</p>
          </div>
        ) : (
          <div className="incorrect_output">
            <p>{guessedPlayer.nationality}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
