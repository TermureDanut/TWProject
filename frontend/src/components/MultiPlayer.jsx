import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./GuessCard/Card";
import SearchBar from "./SearchBar/SearchBar";
import DisabledSearchBar from "./DisabledSearchBar/DisabledSearchBar";
import unknownPhoto from "./unknown.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useLocation } from 'react-router-dom';
import "./MultiplayerStyle.css";

function Multiplayer({route, navigation}) {

  const location = useLocation();
  //const { clientResponse } = location.state || {};
  const { clientResponse} = route?.params || {};

  /*useEffect(() => {
    if (clientResponse) {
      console.log("Client is " + clientResponse);
    } else {
      console.log("Client response is null");
    }
  }, []);*/
  console.log("Client is " + clientResponse);

  const [name1, setName1] = useState("");
  const [shirt1, setShirt1] = useState();
  const [position1, setPosition1] = useState("");
  const [age1, setAge1] = useState();
  const [team1, setTeam1] = useState("");
  const [nationality1, setNationality1] = useState("");
  const [image1, setImage1] = useState("");

  const [name2, setName2] = useState("");
  const [shirt2, setShirt2] = useState();
  const [position2, setPosition2] = useState("");
  const [age2, setAge2] = useState();
  const [team2, setTeam2] = useState("");
  const [nationality2, setNationality2] = useState("");
  const [image2, setImage2] = useState("");

  const unknownImage = unknownPhoto;

  const [inputList1, setInputList1] = useState([]);
  const [inputList2, setInputList2] = useState([]);

  const reversedInputList1 = [...inputList1].reverse();
  const reversedInputList2 = [...inputList2].reverse();

  const [player1Selection, setPlayer1Selection] = useState({});
  const [player2Selection, setPlayer2Selection] = useState({});
  const [player1Guesses, setPlayer1Guesses] = useState(0);
  const [player2Guesses, setPlayer2Guesses] = useState(0);
  const [player1Finished, setPlayer1Finished] = useState(false);
  const [player2Finished, setPlayer2Finished] = useState(false);

  const [jugador1, setJugador1] = useState([]);
  const [jugador2, setJugador2] = useState([]);

  const [player1score, setPlayer1Score] = useState(0);
    const [player2score, setPlayer2Score] = useState(0);

  const jugador1reversed = [...jugador1].reverse();
    const jugador2reversed = [...jugador2].reverse();

  const resetGame = () => {
    try {
      const response = fetch("http://localhost:8080/api/game/start", {
        method: "POST",
      });

        setName1("");
        setShirt1("");
        setPosition1("");
        setAge1();
        setTeam1("");
        setNationality1("");
        setImage1("");
        setName2("");
        setShirt2("");
        setPosition2("");
        setAge2();
        setTeam2("");
        setNationality2("");
        setImage2("");
      setFound1(false);
      setFound2(false);
      setPlayer1Guesses(0);
      setOpen(false);

    }catch (error) {
      return 0;
    }
  }

  const updateGameState = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/game/state");

      setPlayer1Selection(response.data.player1Selection);
      setPlayer2Selection(response.data.player2Selection);
      setPlayer1Guesses(response.data.player1Guesses);
      setPlayer2Guesses(response.data.player2Guesses);
      setPlayer1Finished(response.data.player1Finished);
      setPlayer2Finished(response.data.player2Finished);
      setPlayer1Score(response.data.player1Score);
        setPlayer2Score(response.data.player2Score);

      if(response.data.player2Finished ===true){
        setName2(response.data.player2Selection.name);
        setShirt2(response.data.player2Selection.shirtNumber);
        setPosition2(response.data.player2Selection.position);
        setAge2(response.data.player2Selection.age);
        setTeam2(response.data.player2Selection.team);
        setNationality2(response.data.player2Selection.nationality);
        setImage2(response.data.player2Selection.imageUrl);
        setFound2(true);
      }
      if(response.data.player1Finished === false && response.data.player2Finished ===false){

        setName1("");
        setShirt1("");
        setPosition1("");
        setAge1();
        setTeam1("");
        setNationality1("");
        setImage1("");
        setName2("");
        setShirt2("");
        setPosition2("");
        setAge2();
        setTeam2("");
        setNationality2("");
        setImage2("");
        setFound1(false);
        setFound2(false);
        setOpen(false);
      }



        console.log("Player 1 API GUESSES: " + response.data.player1Guesses);
      console.log("Player 2 API GUESSES: " + response.data.player2Guesses);


      setJugador1(response.data.jugador1);
      setJugador2(response.data.jugador2);

    } catch (error) {
      console.error("Error updating game state:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGameState();
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  const [open, setOpen] = useState(false);
  const [found1, setFound1] = useState(false);
  const [found2, setFound2] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);

  };

  const [maximumTries1, setMaximumTries1] = useState(0);
  const [maximumTries2, setMaximumTries2] = useState(0);

  const makeGuess = async (clientId, guess) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/game/guess/${clientId}`,
        { guess }
      );
      updateGameState();
    } catch (error) {
      console.error("Error making guess:", error);
    }
  };

  const addObject = (newObject, playerNumber) => {
    if (playerNumber === 1) {
      setInputList1([...inputList1, newObject]);
      //setJugador1([...jugador1, newObject]);
    } else if (playerNumber === 2) {
      setInputList2([...inputList2, newObject]);
      //setJugador2([...jugador2, newObject]);
    }
  };

  const handleDataUpdate1 = (data) => {
    addObject(data, 1);
    setMaximumTries1(player1Guesses + 1);
    makeGuess(1, data.name);

    if (data.name === player1Selection.name) {
      setName1(player1Selection.name);
      setShirt1(player1Selection.shirtNumber);
      setPosition1(player1Selection.position);
      setAge1(player1Selection.age);
      setTeam1(player1Selection.team);
      setNationality1(player1Selection.nationality);
      setImage1(player1Selection.imageUrl);
      setFound1(true);
      setPlayer1Finished(true);
      handleClickOpen();
    } else {
      if (maximumTries1 === 7) {
        handleClickOpen();
        setFound1(false);
        setMaximumTries1(0);
        setInputList1([]);
      }
    }

  };

  const handleDataUpdate2 = (data) => {
    addObject(data, 2);
    setMaximumTries2(player2Guesses + 1);
    makeGuess(2, data.name);

    if (data.name === player2Selection.name) {
      setName2(player2Selection.name);
      setShirt2(player2Selection.shirtNumber);
      setPosition2(player2Selection.position);
      setAge2(player2Selection.age);
      setTeam2(player2Selection.team);
      setNationality2(player2Selection.nationality);
      setImage2(player2Selection.imageUrl);
      setFound2(true);
      handleClickOpen();
    } else {
      if (maximumTries2 === 7) {
        handleClickOpen();
        setFound2(false);
        setMaximumTries2(0);
        setInputList2([]);
      }
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="textStyle">Player 1 score: {player1score}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="cardStyle">
                <div className="result">
                  <div className="result_div">{name1}</div>
                  <div className="result_div">{shirt1}</div>
                  <div className="result_div">{position1}</div>
                  <div className="result_div">{age1}</div>
                  <div className="result_div">{team1}</div>
                  <div className="result_div">{nationality1}</div>
                </div>
                <div
                  style={{
                    width: "60%",
                    height: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={found1 === false ? unknownImage : image1}
                    style={{ width: "60%", height: "80%" }}
                  />
                </div>
              </div>
              <SearchBar onDataUpdate={(data) => handleDataUpdate1(data)} />
            </div>
            {player1Guesses === 0 ? (
              <div className="try_number">
                <p> </p>
              </div>
            ) : (
              <div className="try_number">
                <p>{player1Guesses} / 8</p>
              </div>
            )}

            <div>
              {jugador1reversed.map((player, index) => (
                <Card
                  key={index}
                  correctPlayer={player1Selection}
                  guessedPlayer={player}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "100px",
            }}
          >
            <div className="textStyle">Player 2 score: {player2score}</div>
            <div>
              <div className="cardStyle">
                <div className="result">
                  <div className="result_div">{name2}</div>
                  <div className="result_div">{shirt2}</div>
                  <div className="result_div">{position2}</div>
                  <div className="result_div">{age2}</div>
                  <div className="result_div">{team2}</div>
                  <div className="result_div">{nationality2}</div>
                </div>
                <div
                  style={{
                    width: "60%",
                    height: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={found2 === false ? unknownImage : image2}
                    style={{ width: "60%", height: "80%" }}
                  />
                </div>
              </div>
            <DisabledSearchBar/>
            </div>
            {maximumTries2 === 0 ? (
              <div className="try_number">
                <p> </p>
              </div>
            ) : (
              <div className="try_number">
                <p>{maximumTries2} / 8</p>
              </div>
            )}

            <div>
              {jugador2reversed.map((player, index) => (
                <Card
                  key={index}
                  correctPlayer={player2Selection}
                  guessedPlayer={player}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>
            {player1Finished && player2Finished ? (
              player1Guesses < player2Guesses ? (
                <div className="dialog_text">
                  <p> Player 1 wins </p>
                  <button onClick={resetGame}>Play again!</button>
                </div>
              ) : player1Guesses > player2Guesses ? (
                <div className="dialog_text">
                  <p> Player 2 wins </p>
                  <button onClick={resetGame}>Play again!</button>
                </div>
              ) : (
                <div className="dialog_text">
                  <p> It's a tie! </p>
                  <button onClick={resetGame}>Play again!</button>
                </div>
              )
            ) :<div className="dialog_text">
              <p> Waiting for other player to finish </p>
            </div>}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default Multiplayer;
