import "../styles/App.css";
import { useState } from "react";
import Backpacks from "./Backpacks";
import Scoreboard from "./Scoreboard";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <h1>Remember That Pok&eacute;mon!</h1>
      <p>A Pok&eacute;mon memory game</p>
      <section>
        <div className="rules">
          <p>
            Professor Oak needs your help assigning out 12 Pok&eacute;mon to
            split between 2 young trainers. Select a Pok&eacute;mon to assign it
            to a backpack, and continue selecting Pok&eacute;mon until both
            backpacks are full. <b>However,</b> be careful not to select the
            same Pok&eacute;mon twice, or you'll have to start all over!
          </p>
        </div>
        <Backpacks />
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </section>
    </>
  );
}

export default App;
