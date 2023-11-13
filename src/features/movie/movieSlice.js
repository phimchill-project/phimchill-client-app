import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {findMoviesImdb} from "../../api/movieAPI/movieAPI";

const initialState = {
    movies: null,
    loading: false,
    error: null,
    success: false,
};
export const getMoviesByImdb = createAsyncThunk("movie/ImdbList", async () => {
    const response = await findMoviesImdb();
    return response.data;
});

// create slice
export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    // extraReducers de xu ly cac action khong phai do slice dinh nghia ra, o day cac action{ pending, fulfilled, rejected}
    //dươc tao ra tu createAsynThunk nen se chua o extraReducer
    extraReducers: (builder) => {
        builder

            .addCase(getMoviesByImdb.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getMoviesByImdb.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getMoviesByImdb.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.movies = action.payload;
                state.error = false;
            })


    },
});

export const  {
    setLoading,
    setError,
    setSuccess,
} = movieSlice.actions;

export const selectLoading = (state) => state.movie.loading;
export const selectError = (state) => state.movie.error;
export const selectSuccess = (state) => state.movie.success;
export const selectMovies = (state) => state.movie.movies;
export default movieSlice.reducer;
