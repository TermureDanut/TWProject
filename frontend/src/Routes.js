import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singleplayer from "./components/SinglePlayer";
import WelcomePage from "./components/WelcomePage";
import Multiplayer from "./components/MultiPlayer";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/singleplayer" element={<Singleplayer />} />
        <Route exact path="/multiplayer" element={<Multiplayer />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
