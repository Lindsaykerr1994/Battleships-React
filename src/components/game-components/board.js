import Table from "../table-components/table";

export default function Board({ user, orientation }) {
  return (
    <div className={`${user}-board-container col-6 mt-3 justify-content-center`}>
      <Table oVar={orientation} />
    </div>
  );
}
