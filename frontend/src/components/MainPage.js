import React, { useState } from "react";

function MainPage() {
  const cardStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
    padding: "16px",
    backgroundColor: "white",
    width: "550px",
    height: "250px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const inputBarStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    backgroundColor: "white",
    width: "550px",
    marginTop: "75px",
    fontSize: "20px",
    fontFamily: "Lucida Console, Monospace",
  };

  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddInput = () => {
    if (inputValue.trim() !== "") {
      setInputList([...inputList, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInput();
    }
  };

  return (
    <div>
      <div style={cardStyle}>
        <div style={{ height: "100px" }}>
          <p>Position</p>
          <p>Country</p>
          <p>Club</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 0,
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "red",
            }}
          >
            <p>Photo</p>
          </div>
          <div>
            <input
              style={inputBarStyle}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your guess"
            />
          </div>
        </div>
      </div>
      {inputList.map((input, index) => (
        <div key={index} style={cardStyle}>
          <h2>Card Title</h2>
          <p>{input}</p>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
