import React, { useState, useEffect, useContext } from "react";
import Board from "./board";
import Arsenal from "../arsenal-comps/arsenal";
import ShipsContext from "../../context/ships-context";
import PlacedContext from "../../context/placed-context";
import SelectedContext from "../../context/selected-context";

export default function BoardContainer({ gameState }) {
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

  return (
    <div className="board-container row">
      <div>{orVar ? "Vertical" : "Horizontal"}</div>
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
