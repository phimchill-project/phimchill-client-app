import axios from "axios";

export const findMoviesImdb = async () => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:8080/api/movies/imdb`);
    } catch (e) {
        console.log("Movies API error: " + e);
    }
    return result;
};