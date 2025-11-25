import "../styles/App.css";
import { useState, useEffect } from "react";
import Backpacks from "./Backpacks";
import Scoreboard from "./Scoreboard";
import Cards from "./Cards";
import { pokemonList } from "./PokemonList";
import { getPokemon } from "./getPokemon";

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonData, setPokemonData] = useState({});
  const [displayOrder, setDisplayOrder] = useState([]);
  const [gameStatus, setGameStatus] = useState("active");
  const [loading, setLoading] = useState(true);

  function generateRandomDisplayOrder() {
    let orderArray = [];

    function addRandomNumber() {
      // below logic is from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
      const minCeiled = Math.ceil(1);
      const maxFloored = Math.floor(13);
      const randomNumber = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled
      );
      if (!orderArray.includes(randomNumber)) orderArray.push(randomNumber);
      else addRandomNumber();
    }

    while (orderArray.length < 12) {
      addRandomNumber();
    }

    return orderArray;
  }

  useEffect(() => {
    const pokemonListObjects = Object.values(pokemonList);
    let ignore = false;
    pokemonListObjects.forEach((pokemonObject) => {
      getPokemon(pokemonObject.name)
        .then((data) => {
          if (!ignore) {
            setPokemonData((previousPokemonData) => ({
              ...previousPokemonData,
              [pokemonObject.name]: {
                name: pokemonObject.name,
                id: pokemonObject.id,
                src: data,
                selected: false,
              },
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          setGameStatus("error");
        });
    });
    setDisplayOrder(generateRandomDisplayOrder);
    setLoading(false);
    return () => {
      ignore = true;
    };
  }, []);

  function handleCardClick(e) {
    const targetId = Number(e.currentTarget.dataset.customId);
    const pokemonDataObjects = Object.values(pokemonData);
    const targetedObjectArray = pokemonDataObjects.filter(
      (object) => object.id === targetId
    );
    const targetedObject = targetedObjectArray[0];
    if (!targetedObject.selected) {
      const newPokemonData = {
        ...pokemonData,
        [targetedObject.name]: {
          ...pokemonData[targetedObject.name],
          selected: true,
        },
      };
      setPokemonData(newPokemonData);
      setCurrentScore((previousScore) => previousScore + 1);
      if (currentScore === bestScore)
        setBestScore((previousScore) => previousScore + 1);
      if (currentScore === 11) setGameStatus("win");
      else setDisplayOrder(generateRandomDisplayOrder);
    } else {
      setGameStatus("lose");
    }
  }

  function handlePlayAgainClick() {
    const newPokemonData = { ...pokemonData };
    const newPokemonDataObjects = Object.values(newPokemonData);
    newPokemonDataObjects.forEach((object) => {
      newPokemonData[object.name] = {
        ...newPokemonData[object.name],
        selected: false,
      };
    });
    setPokemonData(newPokemonData);
    setGameStatus("active");
    setCurrentScore(0);
    setDisplayOrder(generateRandomDisplayOrder);
  }

  return (
    <>
      <h1>Remember That Pok&eacute;mon!</h1>
      <p>A Pok&eacute;mon memory game</p>
      <div className="info-div">
        <section className="rules">
          <p>
            Professor Oak needs your help assigning out 12 Pok&eacute;mon to
            split between 2 young trainers. Select a Pok&eacute;mon to assign it
            to a backpack, and continue selecting Pok&eacute;mon until both
            backpacks are full. <b>However,</b> be careful not to select the
            same Pok&eacute;mon twice, or you'll have to start all over!
          </p>
        </section>
        <Backpacks currentScore={currentScore} />
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </div>
      {loading && <div>Loading...</div>}
      {gameStatus === "active" && (
        <Cards
          pokemonData={pokemonData}
          displayOrder={displayOrder}
          handleCardClick={handleCardClick}
        />
      )}
      {gameStatus === "lose" && (
        <div className="game-status-div">
          <p>Oh no!</p>
          <p>You already selected that Pok&eacute;mon.</p>
          <button onClick={handlePlayAgainClick}>TRY AGAIN</button>
        </div>
      )}
      {gameStatus === "win" && (
        <div className="game-status-div win">
          <p>Nice job!!</p>
          <div>
            <p>You successfully assigned out all Pok&eacute;mon.</p>
            <p>
              Thanks to you, two young trainers can now begin their
              Pok&eacute;mon journey!
            </p>
          </div>
          <button onClick={handlePlayAgainClick}>PLAY AGAIN</button>
        </div>
      )}
      {gameStatus === "error" && (
        <div className="error-div">
          <p>An error occurred fetching Pok&eacute;mon data.</p>
          <p>We are working to correct this.</p>
        </div>
      )}
    </>
  );
}
