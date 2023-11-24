import axios from "axios";

const API = "http://localhost:8080/api/movies/"
export const getMovieDetail = async () => {
    let result = null;
    try {
        result = await axios.get(`${API}detail`);
    } catch (e) {
        console.log(result);
        return null;
    }
    console.log(result?.data.data);
    return result?.data.data;
}