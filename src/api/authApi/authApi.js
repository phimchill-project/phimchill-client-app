import axios from "axios";
const AUTH_API = "http://localhost:8080/api/auth/";

export const Login = async (user) => {
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}login`,user, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    console.log(result);
};

export const register = async (user) => {
    let result = null;
    try{
        result = await axios.post(
            `${AUTH_API}register`,
            user,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                }
            }
        );
    }
    catch (e) {
        console.log("Find Register API error: " + e);
    }

    return result;
}

export const isEmailExist = async (email) => {
    console.log(email)
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}email-not-existion`,
            email,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    }
    catch (e) {
        console.log("Find Check Email Exist API error: " + e);
    }
    return result?.data;
}