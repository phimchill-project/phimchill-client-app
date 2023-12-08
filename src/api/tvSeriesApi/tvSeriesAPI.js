import axios from "axios";
export const DeleteTVSeries = async (showId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/tvseries/${showId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const findAllTVSeries = async ()=>{
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/all`);
    } catch (e) {
        console.log("TVSeries API error: " + e);
    }
    return result;
};
export const findTvSeriesImdb = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/imdb/top10`);
    } catch (e) {
        console.log("TVSeries API error: " + e);
    }
    return result;
};
export const findTvSeriesFavorites = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/favorites?user_id=1`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};
export const findTvSeriesNewest = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/newest/top10`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};