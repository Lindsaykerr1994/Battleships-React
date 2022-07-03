import TableCell from "./table-cells";

export default function TableRow({ axis, getCellCoors, removeShading, placeShip }) {
  return (
    <tr>
      {Array.from({ length: 11 }, (_, i) => (
        <TableCell
          key={i}
          xAxis={i}
          yAxis={axis}
          getCellCoors={getCellCoors}
          removeShading={removeShading}
          placeShip={placeShip}
        />
      ))}
    </tr>
  );
}
