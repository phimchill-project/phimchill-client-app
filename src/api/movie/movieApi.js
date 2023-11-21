import axios from "axios";
const AUTH_API = "http://localhost:8080/api/movies/";

export const findByName = async (name) => {
    let result = null;
    try {
        result = await axios.get(`${AUTH_API}search?name=${name}`, {
            headers: { }
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};