import axios from "axios";

export const findTvSeriesImdb = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/imdb/top10`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};
export const findTvSeriesFavorites = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/tvseries/newest/top10`);
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