import {configureStore} from "@reduxjs/toolkit";
import movieReducer from "../features/movie/movieSlice";
import tvSeriesReducer from  "../features/tvSeries/tvSeriesSlice"
export const store = configureStore({
    reducer: {
        movie: movieReducer,
        tvSeries: tvSeriesReducer
    },
});