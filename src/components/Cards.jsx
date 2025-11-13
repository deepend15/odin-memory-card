export default function Cards({ pokemonData, displayOrder }) {
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
            const altText = `Image of ${matchingPokemonObject.name}`;
            return (
              <button key={matchingPokemonObject.id} className="card">
                <img src={matchingPokemonObject.src} alt={altText} />
                <p>{capitalizeString(matchingPokemonObject.name)}</p>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}
