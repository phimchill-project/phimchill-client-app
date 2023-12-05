import axios from "axios";

const API = "http://localhost:8080/api/tvseries/";

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

export const findManyTvSeries = async (name) => {
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

export const findById = async (id) => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.get(`${API}${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            })
    } catch (e) {
        console.log("Find Get TvSeries API error: " + e);
        return null;
    }
    return result?.data;
}