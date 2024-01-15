import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./GuessCard/Card";
import SearchBar from "./SearchBar/SearchBar";
import unknownPhoto from "./unknown.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useLocation } from 'react-router-dom';

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
    const [player2Finished, setPlayer2Finished] = useState(true);

    const updateGameState = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/game/state");

            setPlayer1Selection(response.data.player1Selection);
            setPlayer2Selection(response.data.player2Selection);
            setPlayer1Guesses(response.data.player1Guesses);
            setPlayer2Guesses(response.data.player2Guesses);
            setPlayer1Finished(response.data.player1Finished);
            setPlayer2Finished(response.data.player2Finished);
        } catch (error) {
            console.error("Error updating game state:", error);
        }
    };

    useEffect(() => {
        updateGameState();
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
        } else if (playerNumber === 2) {
            setInputList2([...inputList2, newObject]);
        }
    };

    const handleDataUpdate1 = (data) => {
        addObject(data, 1);
        setMaximumTries1(maximumTries1 + 1);
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
        setMaximumTries2(maximumTries2 + 1);
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
                                    correctPlayer={player2Selection}
                                    guessedPlayer={player}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        {player1Finished && player2Finished ? (
                            player1Guesses < player2Guesses ? (
                                <div className="dialog_text">
                                    <p> Player 1 wins </p>
                                </div>
                            ) : player1Guesses > player2Guesses ? (
                                <div className="dialog_text">
                                    <p> Player 2 wins </p>
                                </div>
                            ) : (
                                <div className="dialog_text">
                                    <p> It's a tie! </p>
                                </div>
                            )
                        ) : player1Finished ? (
                            <div className="dialog_text">
                                <p> Player 1 wins </p>
                            </div>
                        ) : player2Finished ? (
                            <div className="dialog_text">
                                <p> Player 2 wins </p>
                            </div>
                        ) : null}
                    </DialogContentText>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    );
}

export default Multiplayer;
