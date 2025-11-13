export async function getPokemon(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon-form/${pokemonName}`;

  try {
    const response = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      throw new Error(
        `Error fetching data for '${pokemonName}.' Response status: ${response.status}`
      );
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}
