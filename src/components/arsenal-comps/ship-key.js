export default function ShipKey({ name, length, selectShip, shipSelected, shipsPlaced }) {
  function getClassName() {
    let classNames = '';
    if (name === shipSelected) { classNames += " selected" };
    if (shipsPlaced.includes(name)) { classNames += " placed" };
    return classNames;
  }
  return (
    <div
      className={`ship-key${getClassName()} `}
      data-name={name}
      onClick={(e) => selectShip(e)}
    >
      {name} - {length}
    </div>
  );
}
