export default function StartButton({gameState, setGameState}) {
  return (
    <button
      className="start-btn"
      disabled={gameState}
      onClick={e => setGameState(true)}>
        Start
    </button>
  )
};
