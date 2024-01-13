import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./GuessCard/Card";
import SearchBar from "./SearchBar/SearchBar";
import unknownPhoto from "./unknown.png";

function Multiplayer() {
  const [clientId, setClientId] = useState(null);
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState(null);

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

  const [searchInput1, setSearchInput1] = useState("");
  const [searchInput2, setSearchInput2] = useState("");

  const reversedInputList1 = [...inputList1].reverse();
  const reversedInputList2 = [...inputList2].reverse();

  const [correctPlayer, setCorrectPlayer] = useState({});

  const fetchPlayer = async () => {
    try {
      const response = await fetch("http://localhost:8080/players/random");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setCorrectPlayer(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  const [open, setOpen] = useState(false);
  const [found1, setFound1] = useState(false);
  const [found2, setFound2] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   setName("");
  //   setShirt("");
  //   setPosition("");
  //   setAge();
  //   setTeam("");
  //   setNationality("");
  //   setImage("");
  // };

  const [maximumTries1, setMaximumTries1] = useState(0);
  const [maximumTries2, setMaximumTries2] = useState(0);
  useEffect(() => {
    const connectClient = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/game/connectClient"
        );
        console.log(response.data);
        setClientId(
          response.data.startsWith("Client")
            ? parseInt(response.data.split(" ")[1])
            : null
        );
      } catch (error) {
        console.error("Error connecting client:", error);
      }
    };

    connectClient();
  }, []);

  const connectSecondClient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/game/connectClient"
      );
      console.log(response.data);
      setClientId(
        response.data.startsWith("Client")
          ? parseInt(response.data.split(" ")[1])
          : null
      );
    } catch (error) {
      console.error("Error connecting client:", error);
    }
  };

  const startGame = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/game/start");
      console.log(response.data);
      updateGameState();
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  const makeGuess = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/game/guess/${clientId}`,
        { guess }
      );
      console.log(response.data);
      updateGameState();
    } catch (error) {
      console.error("Error making guess:", error);
    }
  };

  const updateGameState = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/game/state");
      setGameState(response.data);
    } catch (error) {
      console.error("Error updating game state:", error);
    }
  };

  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const connectSecondPlayer = () => {
    connectSecondClient();
    setShowSecondDiv(true);
  };

  const addObject = (newObject, playerNumber) => {
    if (playerNumber === 1) {
      setInputList1([...inputList1, newObject]);
    } else if (playerNumber === 2) {
      setInputList2([...inputList2, newObject]);
    }
  };

  const handleDataUpdate1 = (data) => {
    addObject(data, 1);
    setMaximumTries1(maximumTries1 + 1);
    if (data.name === correctPlayer.name) {
      setName1(correctPlayer.name);
      setShirt1(correctPlayer.shirtNumber);
      setPosition1(correctPlayer.position);
      setAge1(correctPlayer.age);
      setTeam1(correctPlayer.team);
      setNationality1(correctPlayer.nationality);
      setImage1(correctPlayer.imageUrl);
      setFound1(true);
      handleClickOpen();
    } else {
      if (maximumTries1 == 7) {
        handleClickOpen();
        setFound1(false);
        setMaximumTries1(0);
        setInputList1([]);
      }
    }
  };

  const handleDataUpdate2 = (data) => {
    addObject(data, 2);
    setMaximumTries2(maximumTries2 + 1);
    if (data.name === correctPlayer.name) {
      setName2(correctPlayer.name);
      setShirt2(correctPlayer.shirtNumber);
      setPosition2(correctPlayer.position);
      setAge2(correctPlayer.age);
      setTeam2(correctPlayer.team);
      setNationality2(correctPlayer.nationality);
      setImage2(correctPlayer.imageUrl);
      setFound2(true);
      handleClickOpen();
    } else {
      if (maximumTries2 == 7) {
        handleClickOpen();
        setFound2(false);
        setMaximumTries2(0);
        setInputList2([]);
      }
    }
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
        >
          <button className="sp_mp_buttons" onClick={connectSecondPlayer}>
            Connect Second Player
          </button>
          <button className="sp_mp_buttons" onClick={startGame}>
            Start
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Player 1</div>
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
            {maximumTries1 === 0 ? (
              <div className="try_number">
                <p> </p>
              </div>
            ) : (
              <div className="try_number">
                <p>{maximumTries1} / 8</p>
              </div>
            )}

            <div>
              {reversedInputList1.map((player, index) => (
                <Card
                  key={index}
                  correctPlayer={correctPlayer}
                  guessedPlayer={player}
                />
              ))}
            </div>
          </div>
          {showSecondDiv && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "100px",
              }}
            >
              <div>Player 2</div>
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
                <SearchBar onDataUpdate={(data) => handleDataUpdate2(data)} />
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
                {reversedInputList2.map((player, index) => (
                  <Card
                    key={index}
                    correctPlayer={correctPlayer}
                    guessedPlayer={player}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Multiplayer;
