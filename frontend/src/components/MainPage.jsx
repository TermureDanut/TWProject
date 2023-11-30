import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";

function MainPage() {
  const cardStyle = {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
    padding: "16px",
    backgroundColor: "white",
    width: "550px",
    height: "250px",
    display: "flex",
    justifyContent: "space-between",
  };

  const inputBarStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    backgroundColor: "white",
    width: "542px",
    marginTop: "10px",
    fontSize: "20px",
    fontFamily: "Lucida Console, Monospace",
  };

  const guessStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
    padding: "16px",
    backgroundColor: "white",
    width: "550px",
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
  };

  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddInput = () => {
    if (inputValue.trim() !== "") {
      setInputList([...inputList, inputValue]);
      handleGuess(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInput();
    }
  };

  const reversedInputList = [...inputList].reverse();

  const [correctPlayer] = useState({
    /// random player that comes from backend
    name: "Lionel Messi",
    shirt: 10,
    position: "FW",
    age: 34,
    team: "Inter Miami",
    nationality: "Argentina",
  });

  const [name, setName] = useState("");
  const [shirt, setShirt] = useState();
  const [position, setPosition] = useState("");
  const [age, setAge] = useState();
  const [team, setTeam] = useState("");
  const [nationality, setNationality] = useState("");

  const [playersList] = useState([
    /// comes from backend
    {
      name: "Lionel Messi",
      shirt: 10,
      position: "FW",
      age: 34,
      team: "Inter Miami",
      nationality: "Argentine",
    },
    {
      name: "Cristiano Ronaldo",
      shirt: 7,
      position: "FW",
      age: 37,
      team: "Al Nassr",
      nationality: "Portugal",
    },
    {
      name: "Erling Haaland",
      shirt: 10,
      position: "FW",
      age: 23,
      team: "Man city",
      nationality: "Norway",
    },
  ]);

  const handleGuess = (e) => {
    const foundPlayer = playersList.find(
      (player) => player.name.toLowerCase() === e.toLowerCase()
    );
    if (foundPlayer) {
      if (foundPlayer.name === correctPlayer.name) {
        setName(correctPlayer.name);
        setShirt(correctPlayer.shirt);
        setPosition(correctPlayer.position);
        setAge(correctPlayer.age);
        setTeam(correctPlayer.team);
        setNationality(correctPlayer.nationality);
      } else {
        console.log("maybe some stats are good");
      }
    } else {
      console.log("player doesn t exist");
    }
    setInputValue("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={cardStyle}>
        <div
          style={{
            width: "40%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontFamily: "Lucida Console, Monospace",
          }}
        >
          <p>{name}</p>
          <p>{shirt}</p>
          <p>{position}</p>
          <p>{age}</p>
          <p>{team}</p>
          <p>{nationality}</p>
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
      <SearchBar></SearchBar>
    </div>
  );
}

export default MainPage;
