import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Card from "./GuessCard/Card";
import "./style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MainPage() {
  const [inputList, setInputList] = useState([]);

  const reversedInputList = [...inputList].reverse();

  const [correctPlayer] = useState({
    name: "Lionel Messi",
    shirt: 10,
    position: "FW",
    age: 34,
    team: "Inter Miami",
    nationality: "Argentine",
  });

  const [name, setName] = useState("");
  const [shirt, setShirt] = useState();
  const [position, setPosition] = useState("");
  const [age, setAge] = useState();
  const [team, setTeam] = useState("");
  const [nationality, setNationality] = useState("");

  const addObject = (newObject) => {
    setInputList([...inputList, newObject]);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [maximumTries, setMaximumTries] = useState(0);
  const handleDataUpdate = (data) => {
    addObject(data);
    setMaximumTries(inputList.length);
    if (maximumTries == 7) {
      setMaximumTries(0);
      setInputList([]);
      handleClickOpen();
    }
    if (data.name === correctPlayer.name) {
      setName(correctPlayer.name);
      setShirt(correctPlayer.shirt);
      setPosition(correctPlayer.position);
      setAge(correctPlayer.age);
      setTeam(correctPlayer.team);
      setNationality(correctPlayer.nationality);
      handleClickOpen();
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
              src={require("./unknown.png")}
              alt="Unknown"
              style={{ width: "60%", height: "80%" }}
            />
          </div>
        </div>
        <SearchBar onDataUpdate={handleDataUpdate} />
      </div>
      <div>
        {reversedInputList.map((player, index) => (
          <Card
            key={index}
            correctPlayer={correctPlayer}
            guessedPlayer={player}
          />
        ))}
      </div>
      {maximumTries === 7 ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Player not found. Better luck next time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Play Again</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default MainPage;
