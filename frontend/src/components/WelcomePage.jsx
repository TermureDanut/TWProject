import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import "./Welcomestyle.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DynamicDialogContent from './DynamicDialogContent';
import logo from './logo.png';
import anthem from './OM ANTHEM.mp3';

function WelcomePage({navigation}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [clientResponse, setClientResponse] = useState(null); 

  const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
  );

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);



  const connectClient = async () => {
    const response = await fetch(
      "http://localhost:8080/api/game/connectClient",
      {
        method: "POST",
      }
    );
  };

  const startGame = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/game/start", {
        method: "POST",
      });

      //console.log(response);

      if (response.ok) {
        console.log(response.json());
        return 1;
      } else {
        console.log(response.json());
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  const goToMultiplayer = async () => {
    setOpen(true);
    await connectClient();
    let value = 0;
    while(true){

      value += 1;
      if ((await startGame()) === 1) {
        await delay(2000);
        setOpen(false);
        //history.push("/multiplayer", { clientResponse: data });
        //navigate("/multiplayer", { state: { clientResponse: clientResponse } }); // Ensure clientResponse is the updated state
        console.log("Value is: " + value);
        navigate('/multiplayer', { clientResponse: clientResponse });
        break;
      }
    }
    if(value === 1){
      navigate('/mսltiplayer')
    }

  };

  const goToSingleplayer = () => {
    navigate("/singleplayer");
  };

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <div className="img">
        <img src= {logo} />
      </div>
      <button className="sp_mp_buttons" onClick={goToSingleplayer}>
        SinglePlayer
      </button>
      <button className="sp_mp_buttons" onClick={goToMultiplayer}>
        MultiPlayer
      </button>
      <Dialog open={open}>
        <DynamicDialogContent />
      </Dialog>
    </div>
  );

}

export default WelcomePage;
