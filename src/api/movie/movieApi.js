import axios from "axios";

const API = "http://localhost:8080/api/movies/";

export const findByName = async (name) => {
    let result = null;
    try {
        result = await axios.get(`${API}search?name=${name}`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};

export const findMoviesByName = async (name) => {
    let result = null;
    try {
        result = await axios.get(`${API}search?name=${name}&type=all`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};
export const findAllMovies = async (pageNumber = 0, pageSize = 7) => {
    let result = null;
    try {
        const params = new URLSearchParams({
            pageNumber,
            pageSize
        }).toString();
        result = await axios.get(`${API}all?${params}`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find all movies API error: ", e);
    }
    console.log(result);
    return result?.data;
};

export const updateMovies = async (movieData) => {
    let result = null;
    try {
        result = await axios.put(`${API}update/${movieData.id}`, movieData, {
        });
    } catch (e) {
        console.log("Update movies API error: " + e);
    }
    return result?.data;
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await axios.delete(`${API}${movieId}`);
        return response.data;
    } catch (error) {
        console.error("Delete movie API error: " + error);
    }
};
