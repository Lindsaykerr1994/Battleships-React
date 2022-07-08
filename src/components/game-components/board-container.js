import React, { useState, useEffect, useContext, useCallback } from "react";

import ShipsContext from "../../context/ships-context";
import PlacedContext from "../../context/placed-context";
import SelectedContext from "../../context/selected-context";

import Board from "./board";
import Arsenal from "../arsenal-components/arsenal";

import { getOpponentCoords } from "../miscellaneous/shared";

export default function BoardContainer({ gameState, setMessage }) {
  let ships = useContext(ShipsContext);
  const [shipsPlacedStatus, setShipsPlaced] = useState(false);
  const [placedShips, placeSelectedShip] = useState([]);
  const [shipSelected, selectShip] = useState("");
  // Vertical = true, Horizontal = false;
  const [orVar, changeOr] = useState(false);
  const [oppCoors, setOppsCoords] = useState([])
  const [playerTurn, changeTurn] = useState(false)

  useEffect(() => {
    if (placedShips.length === ships.length) {
      setShipsPlaced(true);
    }
  }, [placedShips.length, ships.length])

    const makeGuess = useCallback((e) => {
    if (!playerTurn) return;
    console.log(e.currentTarget.dataset.coords);
    changeTurn(false);
  }, [playerTurn])

  useEffect(() => {
    if (Object.keys(oppCoors).length) return;
    if (gameState && shipsPlacedStatus) {
      setMessage("Let's play!");
      setOppsCoords(getOpponentCoords());
      document.querySelectorAll(".opponent-board-container .game-piece").forEach((cell) => {
        cell.addEventListener("click", makeGuess)
      })
      changeTurn(true)
    } else if (gameState && !shipsPlacedStatus) {
      setMessage("Place your ships")
    }
    
  }, [shipsPlacedStatus, gameState, setMessage, oppCoors, makeGuess]);



  return (
    <div className="board-container row">
      <SelectedContext.Provider value={[shipSelected, selectShip]}>
        <PlacedContext.Provider value={[placedShips, placeSelectedShip]}>
          <Board user="player" orientation = {orVar} />
          <Board user="opponent" />

          <Arsenal gameState={gameState} shipsPlacedStatus={shipsPlacedStatus} orientation={orVar} changeOr={changeOr} />
        </PlacedContext.Provider>
      </SelectedContext.Provider>
    </div>
  );
}
