import axios from "axios";

const API = "http://localhost:8080/api/users/";
export const getFavoriteMovies = async () => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.get(`${API}favorite-movies`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });
    } catch (e) {
        console.log("Can not get favorite-movies error: " + e);
        return null;
    }
    return result?.data.data;
}
export const getFavoriteTvSeries= async () => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.get(`${API}favorite-tvseries`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });
    } catch (e) {
        console.log("Can not get favorite-tvseries error: " + e);
        return null;
    }
    return result?.data.data;
}
export const deleteFavoriteMovie= async (id) => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.delete(`${API}favorite-movies/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });
    } catch (e) {
        return null;
    }
    return result?.data.data;
}
export const deleteFavoriteTVSeries= async (id) => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.delete(`${API}favorite-tvseries/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });
    } catch (e) {
        return null;
    }
    return result?.data.data;
}
