import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function WelcomePage() {
  const navigate = useNavigate();

  const goToSingleplayer = () => {
    navigate("/singleplayer");
  };

  const goToMultiplayer = () => {
    navigate("/multiplayer");
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
    </div>
  );
}

export default WelcomePage;
