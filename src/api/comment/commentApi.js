import axios from "axios";

const API = "http://localhost:8080/api/"
const AUTH_API = "http://localhost:8080/api/auth/";

export const getAllCommentsByMovieId = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${API}movies/${id}/comments`);
    } catch (e) {
        return null;
    }
    return result?.data;
}

export const postCommentMovie = async (movieCommentRequest) => {
    let token = localStorage.getItem("token");
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}comment/movie-comment`,
            movieCommentRequest,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            })
    } catch (e) {
        console.log("Find Post Movie Comment API error: " + e);
        return null;
    }
    console.log(result?.data);
    return result?.data;
}
export const postSubCommet = async (subCommentRequest, commetID) => {
    let token = localStorage.getItem("token");
    let result = null;
    console.log(subCommentRequest)
    try {
        result = await axios.post(`${AUTH_API}comment/movie-comment/${commetID}/subcomment`,
            subCommentRequest,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
    } catch (e) {
        console.log("Find Post Movie Comment API error: " + e);
        return null;
    }
    return result?.data;
}

export const getAllSubCommentsByCommentId = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${API}comment/${id}/subcomments`);
    } catch (e) {
        return null;
    }
    return result?.data.data;
}
