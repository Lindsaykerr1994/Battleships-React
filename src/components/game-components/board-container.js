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

  useEffect(() => {
    if (placedShips.length === ships.length) {
      setShipsPlaced(true);
    }
  }, [placedShips.length, ships.length])

  return (
    <div className="board-container row">
      <SelectedContext.Provider value={shipSelected}>
        <PlacedContext.Provider value={[placedShips, placeSelectedShip]}>
          <Board user="player" />
          <Board user="opponent" />

          <Arsenal gameState={gameState} selectShip={selectShip} shipsPlacedStatus={shipsPlacedStatus} />
        </PlacedContext.Provider>
      </SelectedContext.Provider>
    </div>
  );
}
