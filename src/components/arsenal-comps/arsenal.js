import { useEffect, useContext } from "react";

import ShipsContext from "../../context/ships-context";
import PlacedContext from "../../context/placed-context";
import SelectedContext from "../../context/selected-context";
import ShipKey from "./ship-key";

export default function Arsenal({ gameState, selectShip }) {
  let shipSelected = useContext(SelectedContext);
  let shipsPlaced = useContext(PlacedContext)[0];

  let ships = useContext(ShipsContext);
  const selectNewShip = (e) => {
    var newShip = e.currentTarget.getAttribute("data-name");
    shipSelected === newShip ? selectShip("") : selectShip(newShip);
  };
  useEffect(() => {
    if (shipSelected) {
      console.log("Current Ship: ", shipSelected);
    }
  }, [shipSelected]);

  return (
    <div id="arsenal" className={`${gameState ? "d-block" : "d-none"} container position-absolute`}>
      <div className="row">
        <div className="col-12">Arsenal</div>
      </div>
      <div className="row">
        {ships.map((ship, i) => (
          <ShipKey
            key={i}
            name={ship.name}
            length={ship.length}
            selectShip={selectNewShip}
            shipSelected={shipSelected}
            shipsPlaced={shipsPlaced}
          />
        ))}
      </div>
    </div>
  );
}
