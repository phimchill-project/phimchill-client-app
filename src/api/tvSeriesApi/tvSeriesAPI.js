import axios from "axios";

export const findTvSeriesImdb = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/series/imdb/top10`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};
export const findTvSeriesFavorites = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/series/favorites?user_id=1`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};
export const findTvSeriesNewest = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/series/newest/top10`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};