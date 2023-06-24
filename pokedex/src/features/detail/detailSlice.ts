import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../app/store";
import { fetchPokemonDetails } from "./pokemonDetailAPI";

// Create a thunk to fetch a pokemon by it's id
export const fetchPokemonDetailsAsync = createAsyncThunk(
    'detail/fetchPokemonDetails',
    async (id: string) => {
        try {
            // wait 1.5 seconds then execute the fetchPokemonDetails function
            await new Promise(resolve => setTimeout(resolve, 1500));
            const response = await fetchPokemonDetails(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Define a type for the slice state
export interface DetailState {
    pokemon: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: DetailState = {
    pokemon: null,
    status: 'idle',
};

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonDetailsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemonDetailsAsync.fulfilled, (state, action) => {
                state.pokemon = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchPokemonDetailsAsync.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

// Redux action creator function for selecting a pokemon by it's id
export const selectPokemon = (pokemonId: string) => (dispatch: AppDispatch) => {
    dispatch(fetchPokemonDetailsAsync(pokemonId));
};

// Redux selector functions for selecting the pokemon and loading status from the
// Redux store. Used in combination with the useAppSelector hook to access the
// Redux store from within a React component
export const selectSelectedPokemon = (state: RootState) => state.detail.pokemon;
export const selectLoadingStatus = (state: RootState) => state.detail.status;

export default detailSlice.reducer;