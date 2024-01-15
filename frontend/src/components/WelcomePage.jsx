import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function WelcomePage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const connectClient = async () => {
    const response = await fetch(
      "http://localhost:8080/api/game/connectClient",
      {
        method: "POST",
      }
    );
    console.log(response.json());
  };

  const startGame = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/game/start", {
        method: "POST",
      });

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

    if ((await startGame()) === 1) {
      setOpen(false);
      navigate("/multiplayer");
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
      <div className="text">FootyFinderRO</div>
      <button className="sp_mp_buttons" onClick={goToSingleplayer}>
        SinglePlayer
      </button>
      <button className="sp_mp_buttons" onClick={goToMultiplayer}>
        MultiPlayer
      </button>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>Waiting for another player</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WelcomePage;
