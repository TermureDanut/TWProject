import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Card from "./GuessCard/Card";
import "./style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import unknownPhoto from "./unknown.png";

function MainPage() {
  const [inputList, setInputList] = useState([]);

  const unknownImage = unknownPhoto;
  const reversedInputList = [...inputList].reverse();

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

  const [name, setName] = useState("");
  const [shirt, setShirt] = useState();
  const [position, setPosition] = useState("");
  const [age, setAge] = useState();
  const [team, setTeam] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");

  const addObject = (newObject) => {
    setInputList([...inputList, newObject]);
  };

  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName("");
    setShirt("");
    setPosition("");
    setAge();
    setTeam("");
    setNationality("");
    setImage("");
  };

  const seeResults = () => {
    setOpen(false);
  }

  const playAgain = () => {
    // Reset the state variables
    setName("");
    setShirt("");
    setPosition("");
    setAge();
    setTeam("");
    setNationality("");
    setImage("");
    setFound(false);
    setMaximumTries(0);
    setInputList([]);

    // Fetch a new player
    fetchPlayer();

    // Close the dialog
    handleClose();
  };


  const [maximumTries, setMaximumTries] = useState(0);
  const handleDataUpdate = (data) => {
    addObject(data);
    setMaximumTries(maximumTries + 1);
    if (data.name === correctPlayer.name) {
      setName(correctPlayer.name);
      setShirt(correctPlayer.shirtNumber);
      setPosition(correctPlayer.position);
      setAge(correctPlayer.age);
      setTeam(correctPlayer.team);
      setNationality(correctPlayer.nationality);
      setImage(correctPlayer.imageUrl);
      setFound(true);
      handleClickOpen();
    } else {
      if (maximumTries == 7) {
        handleClickOpen();
        setFound(false);
        setMaximumTries(0);
        setInputList([]);
        fetchPlayer();
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="cardStyle">
          <div className="result">
            <div className="result_div">{name}</div>
            <div className="result_div">{shirt}</div>
            <div className="result_div">{position}</div>
            <div className="result_div">{age}</div>
            <div className="result_div">{team}</div>
            <div className="result_div">{nationality}</div>
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
              src={found === false ? unknownImage : image}
              style={{ width: "60%", height: "80%" }}
            />
          </div>
        </div>
        <SearchBar onDataUpdate={handleDataUpdate} />
      </div>
      {maximumTries === 0 ? (
        <div className="try_number">
          <p> </p>
        </div>
      ) : (
        <div className="try_number">
          <p>{maximumTries} / 8</p>
        </div>
      )}

      <div>
        {reversedInputList.map((player, index) => (
          <Card
            key={index}
            correctPlayer={correctPlayer}
            guessedPlayer={player}
          />
        ))}
      </div>
      <Dialog open={open} onClose={seeResults}>
        <DialogContent>
          <DialogContentText>
            {found === true ? (
              <div className="dialog_text">
                <p>{correctPlayer.name} is the correct player!</p>
              </div>
            ) : (
              <div className="dialog_text">
                <p>
                  {correctPlayer.name} was the correct player. Better luck next
                  time!
                </p>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={playAgain}>Play Again</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MainPage;
