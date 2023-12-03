import axios from "axios";

const API = "http://localhost:8080/api/"

export const getAllCategory = async () => {
    let result = null;
    try {
        result = await axios.get(`${API}category`);
    } catch (e) {
        console.log("Find Check Email Exist API error: " + e);
        console.log(result);
        return null;
    }
    console.log(result?.data.data);
    return result?.data.data;
}

export const getBlockbusterMovies = async () => {
    let result = null;
    try {
        result = await axios.get(`${API}movies/blockbuster`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        console.log(result);
        return null;
    }
    return result?.data.data;
}

export const getUpcomingMovieslist = async () => {
    let result = null;
    try {
        result = await axios.get(`${API}movies/upcoming`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        console.log(result);
        return null;
    }
    return result?.data.data;
}
export const getTopMoviesByViewslist = async () =>{
    let result = null;
    try {
        result = await axios.get(`${API}movies/top-views`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        console.log(result);
        return null;
    }
    return result?.data.data;
}

export const getMoviesbyImbdTop = async () => {
    let result = null;
    try {
        result = await axios.get(`${API}movies/top-imdb`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        console.log(result);
        return null;
    }
    return result?.data.data;
}

export const getMoviesByCategoryId = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${API}category/${id}/movies`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        return null;
    }
    return result?.data.data;
}

export const getTvSeriesByCategoryId = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${API}category/${id}/tv-series`);
    } catch (e) {
        console.log("Find Check API error: " + e);
        return null;
    }
    console.log(result.data.data);
    return result?.data.data;
}