import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth/";

export const login = async (user) => {
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}login`, user, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
        return result.data;
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return null;
};

export const register = async (user) => {
    let result = null;
    try {
        result = await axios.post(
            `${AUTH_API}register`,
            user,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
    }
    catch (e) {
        console.log("Find Register API error: " + e);
    }
    return result?.data;
}

export const isEmailExist = async (email) => {
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}email-not-existion`,
            email,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    catch (e) {
        console.log("Find Check Email Exist API error: " + e);
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
                    Accept :  'application/json',
                    'Content-Type': 'application/json',
                    Authorization : "Bearer " + token
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
        result = await axios.post(`${AUTH_API}comment/movie-comment/1/subcomment`,
            subCommentRequest,
            {
                headers: {
                    Accept :  'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
    } catch (e) {
        console.log("Find Post Movie Comment API error: " + e);
        return null;
    }
    console.log(result?.data);
    return result?.data;
}

