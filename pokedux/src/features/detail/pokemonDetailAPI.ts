//  Function that calls the poke api (https://pokeapi.co/api/v2/pokemon) and returns a list of the first 10 pokemon
export const fetchPokemonDetails = async (pokemonId: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    const data = await response.json();
    return data;
}
