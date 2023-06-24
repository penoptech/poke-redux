import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPokemon } from './pokemonSearchAPI';
import { RootState } from '../../app/store';
import { set } from 'immer/dist/internal';

interface Pokemon {
    id: string;
    name: string;
    url: string;
}

export interface SearchState {
    pokemon: Pokemon[];
    status: 'idle' | 'loading' | 'failed';
    searchedPokemon: Pokemon[];
}

const initialState: SearchState = {
    pokemon: [],
    status: 'idle',
    searchedPokemon: [],
};

export const fetchAllPokemonAsync = createAsyncThunk(
    'search/fetchAllPokemon',
    async () => {
        try {
            // wait 1.5 seconds then execute the fetchAllPokemon function
            await new Promise(resolve => setTimeout(resolve, 1500));
            const data = await fetchAllPokemon();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        searchByName: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            if (searchTerm === '') {
                state.searchedPokemon = [];
            } else {
                state.searchedPokemon = state.pokemon.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(searchTerm)
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPokemonAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPokemonAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pokemon = action.payload.map((pokemonData: any) => {
                    const id = pokemonData.url.split('/').slice(-2, -1)[0];
                    const name = pokemonData.name;
                    const url = pokemonData.url;
                    return { id, name, url };
                });
            })
            .addCase(fetchAllPokemonAsync.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const selectLoadingStatus = (state: RootState) => state.search.status;
export const selectPokemonList = (state: RootState) => state.search.pokemon;
export const selectSearchedPokemon = (state: RootState) => state.search.searchedPokemon;

export const { searchByName } = searchSlice.actions;

// Need to export slice reducer as default
export default searchSlice.reducer;