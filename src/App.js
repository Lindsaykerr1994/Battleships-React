import React, { useEffect, useState } from "react";
import "./stylesheets/App.scss";

import { SHIPS } from "./constants/ships";
import ShipsContext from "./context/ships-context";

import BoardContainer from "./components/game-components/board-container";
import MessageContainer from "./components/miscellaneous/message-container";
import StartButton from "./components/miscellaneous/start-button";

function App() {
  const [gameState, setGameState] = useState(false);
  const [message, setMessage] = useState("Welcome!");

  useEffect(() => {
    console.log("test")
  }, [gameState])

  return (
    <ShipsContext.Provider value={SHIPS}>
      <div className="App container">
        <MessageContainer message={message} />
        <BoardContainer gameState={gameState} setMessage={setMessage} />
        <div className="start-btn-container mt-3 row justify-content-center">
          <div className="col-auto">
            <StartButton gameState={gameState} setGameState={setGameState} />
          </div>
        </div>
      </div>
    </ShipsContext.Provider>
  );
}

export default App;
