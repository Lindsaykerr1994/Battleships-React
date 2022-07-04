import React, { useState, useEffect, useContext } from "react";
import Board from "./board";
import Arsenal from "../arsenal-components/arsenal";
import ShipsContext from "../../context/ships-context";
import PlacedContext from "../../context/placed-context";
import SelectedContext from "../../context/selected-context";

export default function BoardContainer({ gameState, setMessage }) {
  let ships = useContext(ShipsContext);
  const [shipsPlacedStatus, setShipsPlaced] = useState(false);
  const [placedShips, placeSelectedShip] = useState([]);
  const [shipSelected, selectShip] = useState("");
  // Vertical = true, Horizontal = false;
  const [orVar, changeOr] = useState(false);

  useEffect(() => {
    if (placedShips.length === ships.length) {
      setShipsPlaced(true);
    }
  }, [placedShips.length, ships.length])

  useEffect(() => {
    if (gameState && shipsPlacedStatus) {
      setMessage("Let's play!")
    } else if (gameState && !shipsPlacedStatus) {
      setMessage("Place your ships")
    }
  }, [shipsPlacedStatus, gameState, setMessage])

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
