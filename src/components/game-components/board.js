import Table from "../table-components/table";

export default function Board({ user }) {
  return (
    <div className={`${user}-board-container col-6 mt-3 justify-content-center`}>
      <Table />
    </div>
  );
}
