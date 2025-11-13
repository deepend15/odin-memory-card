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
            const srcValue = data.sprites.front_default;
            setPokemonData((previousPokemonData) => ({
              ...previousPokemonData,
              [pokemonObject.name]: {
                name: pokemonObject.name,
                id: pokemonObject.id,
                src: srcValue,
              },
            }));
          }
        })
        .catch((error) => console.log(error));
    });
    setDisplayOrder(generateRandomDisplayOrder);
    return () => {
      ignore = true;
    };
  }, []);

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
      <Cards pokemonData={pokemonData} displayOrder={displayOrder} />
    </>
  );
}
