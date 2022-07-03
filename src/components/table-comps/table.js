import { useContext } from "react";

import SelectedContext from "../../context/selected-context";
import ShipsContext from "../../context/ships-context";

import TableRow from "./table-rows";

import { ROWS } from "../../constants/constants";
import PlacedContext from "../../context/placed-context";

import { toBoolean  } from "../miscellaneous/shared";

export default function Table() {
  const shipSelected = useContext(SelectedContext);
  const [shipsPlaced, placeSelectedShip] = useContext(PlacedContext);
  const ships = useContext(ShipsContext);


  function checkSelectedShipPlacedStatus(name) {
    if (shipsPlaced.includes(name)) return true;
    return false;
  }

  function getCellCoors(e) {
    let currentCells = e.currentTarget.dataset.coords;
    if (shipSelected && e.currentTarget.closest(".player-board-container")) {
      shadeTableCells(calculateJoinedCells(getLengthOfShip(shipSelected, ships), currentCells));
    }
  }

  function placeShip(e) {
    if (checkSelectedShipPlacedStatus(shipSelected)) return;

    let currentCells = e.currentTarget.dataset.coords;
    let playerBoard = e.currentTarget.closest(".player-board-container");
    if (shipSelected && playerBoard) {
      let potentialCoords = calculateJoinedCells(getLengthOfShip(shipSelected, ships), currentCells)
      if (checkCellOccupancy(potentialCoords, playerBoard)) return;

      changeCellOccupancy(potentialCoords, playerBoard);
      placeSelectedShip([...shipsPlaced, shipSelected]);
    }
  }
  return (
    <table className="mx-auto">
      <tbody>
        {Array.from({ length: 11 }, (_, i) => (
          <TableRow key={i} axis={i} getCellCoors={getCellCoors} removeShading={removeShading} placeShip={placeShip} />
        ))}
      </tbody>
    </table>
  );
}

function getLengthOfShip(shipSelected, ships) {
  for (let ship of ships) {
    if (ship["name"] === shipSelected) {
      return ship["length"];
    }
  }
}

function calculateJoinedCells(length, currentCoor, orientation = "H") {
  let startingCoor,
    constantCoor,
    startingIndex,
    axisArray = [];
  if (orientation === "H") {
    startingCoor = currentCoor[0];
    constantCoor = currentCoor.slice(1);
    axisArray = ROWS;
  } else {
    startingCoor = currentCoor.slice(1);
    constantCoor = currentCoor[0];
    axisArray = Array.from({ length: 10 }, (_, i) => i + 1);
  }
  startingIndex = calculateStartingIndex(axisArray, startingCoor, length);
  return buildCoorsArray(length, startingIndex, axisArray, constantCoor, orientation);
}

function calculateStartingIndex(array, entry, length) {
  let startingIndex = array.indexOf(entry);
  if (startingIndex + length > array.length) {
    startingIndex = array.length - length;
  }
  return startingIndex;
}

function buildCoorsArray(length, startingIndex, array, constantCoor, orientation) {
  let res = [],
    i;
  for (i = 0; i < length; i++) {
    res.push(orientation === "H" ? array[startingIndex + i] + constantCoor : constantCoor + array[startingIndex + 1]);
  }
  return res;
}

function shadeTableCells(array) {
  let i;
  let playerBoard = document.querySelector(".player-board-container");
  removeShading();
  for (i = 0; i < array.length; i++) {
    playerBoard.querySelector(`.game-piece[data-coords="${array[i]}"]`).classList.add("pseudo-hover");
  }
}

function removeShading() {
  document
    .querySelectorAll(".player-board-container .game-piece.pseudo-hover")
    .forEach((el) => el.classList.remove("pseudo-hover"));
}

function checkCellOccupancy(array, board) {
  if (!board) return;
  for (let i = 0; i < array.length; i++) {
    let coord = array[i];
    let square = board.querySelector(`.game-piece[data-coords='${coord}']`);
    if (toBoolean(square.getAttribute('data-occupied'))) return true;
  }
  return false;
}
function changeCellOccupancy(array, board) {
  if (!board) return;
  for (let i = 0; i < array.length; i++) {
    let coord = array[i];
    let square = board.querySelector(`.game-piece[data-coords='${coord}']`);
    square.setAttribute('data-occupied', !toBoolean(square.getAttribute('data-occupied')));
  }
}
