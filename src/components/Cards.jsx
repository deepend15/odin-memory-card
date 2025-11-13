import "../styles/Cards.css";

export default function Cards({ pokemonData, displayOrder, handleCardClick }) {
  const pokemonDataObjects = Object.values(pokemonData);

  function capitalizeString(string) {
    return string.at(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="card-div">
      {pokemonDataObjects.length === 12 && (
        <>
          {displayOrder.map((number) => {
            const matchingPokemonObjectArray = pokemonDataObjects.filter(
              (object) => object.id === number
            );
            const matchingPokemonObject = matchingPokemonObjectArray[0];
            const pokemonName = capitalizeString(matchingPokemonObject.name);
            const altText = `Image of ${pokemonName}`;
            return (
              <button
                key={matchingPokemonObject.id}
                className="card"
                data-custom-id={matchingPokemonObject.id}
                onClick={handleCardClick}
              >
                <img src={matchingPokemonObject.src} alt={altText} />
                <p>{pokemonName}</p>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}
