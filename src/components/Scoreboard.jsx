export default function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard-div">
      <h2>SCOREBOARD</h2>
      <p className="score-line current-score">
        <span>Current score:</span>
        <span>{currentScore}</span>
      </p>
      <p className="score-line">
        <span>Best score:</span>
        <span>{bestScore}</span>
      </p>
    </div>
  );
}
