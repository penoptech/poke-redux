export const fetchAllPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=-1');
    const data = await response.json();
    return data.results;
}