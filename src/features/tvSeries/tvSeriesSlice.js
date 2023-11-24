import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findTvSeriesImdb, findTvSeriesFavorites, findTvSeriesNewest } from "../../api/tvSeriesApi/tvSeriesAPI";

const initialState = {
    imdb: null,
    favorites: null,
    newest: null,
    loading: false,
    error: null,
};

export const getTvSeriesByImdb = createAsyncThunk("tvSeries/ImdbList", async () => {
    const response = await findTvSeriesImdb();
    return response.data;
});

export const getTvSeriesByFavorites = createAsyncThunk("tvSeries/FavoritesList", async () => {
    const response = await findTvSeriesFavorites();
    return response.data;
});

export const getTvSeriesByNewest = createAsyncThunk("tvSeries/NewestList", async () => {
    const response = await findTvSeriesNewest();
    return response.data;
});

export const tvSeriesSlice = createSlice({
    name: "tvSeries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTvSeriesByImdb.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTvSeriesByImdb.fulfilled, (state, action) => {
                state.loading = false;
                state.imdb = action.payload;
            })
            .addCase(getTvSeriesByImdb.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTvSeriesByFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTvSeriesByFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getTvSeriesByFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTvSeriesByNewest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTvSeriesByNewest.fulfilled, (state, action) => {
                state.loading = false;
                state.newest = action.payload;
            })
            .addCase(getTvSeriesByNewest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});
export const selectImdb = (state) => state.tvSeries.imdb;
export const selectFavorites = (state) => state.tvSeries.favorites;
export const selectNewest = (state) => state.tvSeries.newest;
export const selectLoading = (state) => state.tvSeries.loading;
export const selectError = (state) => state.tvSeries.error;
export default tvSeriesSlice.reducer;
