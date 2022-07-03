import { ROWS } from "../../constants/constants";

export default function TableCell({ xAxis, yAxis, getCellCoors, removeShading, placeShip }) {
  let cell;
  if (xAxis !== 0 && yAxis !== 0) {
    cell = (
      <td
        className="game-piece"
        data-coords={ROWS[xAxis - 1] + yAxis}
        data-occupied={false}
        onMouseEnter={(e) => getCellCoors(e)}
        onMouseLeave={removeShading}
        onClick={(e) => placeShip(e)}
      ></td>
    );
  } else if (xAxis === 0 && yAxis !== 0) {
    cell = <td className="header-col">{yAxis}</td>;
  } else if (xAxis !== 0 && yAxis === 0) {
    cell = <td className="header-row">{ROWS[xAxis - 1]}</td>;
  } else {
    cell = <td></td>;
  }

  return cell;
}
