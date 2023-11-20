import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi/exportAuthApi";

function SignUp() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [errorEmailMessage, setErrorEmailMessage] = useState();
    const [errorNameMessage, setErrorNameMessage] = useState();
    const [errorPasswordMessage, setErrorPasswordMessage] = useState();
    const [errorRepeatPasswordMessage, setErrorRepeatPasswordMessage] = useState();
    const navigate = useNavigate();
    const handleChangeEmail = (e) => {
        let value = e.target.value;
        setEmail({
            ...email,
            value: value,
            isEmailValid: false
        })
        checkValidEmail(value);
    }
    const checkValidEmail = (value) => {
        const regex = /^[a-zA-Z0-9@.]+$/
        if (regex.test(value)) {
            setErrorEmailMessage({
                ...errorEmailMessage,
                isValid: true,
                emailError: ""
            })
        } else {
            setErrorEmailMessage({
                ...errorEmailMessage,
                isValid: false,
                emailError: "Email not consist of speacial characters"
            })
        }
    }
    const checkEmailExist = async (email) => {
        let emailCheck = { email: email };
        let result = await authApi.isEmailExist(emailCheck)
        return result;
    }
    const handleBlurEmail = async (e) => {
        const value = e.target.value;
        e.preventDefault();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
        const isRegextrue = regex.test(value);
        if (!isRegextrue) {
            setErrorEmailMessage({
                ...errorEmailMessage,
                isValid: false,
                emailError: "Email not valid"
            });
        } else {
            let result = await checkEmailExist(value);
            if (result) {
                setErrorEmailMessage({
                    ...errorEmailMessage,
                    isValid: false,
                    emailError: "Email already exist",
                });
            } else {
                setErrorEmailMessage({
                    ...errorEmailMessage,
                    isValid: true,
                    emailError: "Email can be use",
                })
                setEmail({
                    ...email,
                    isEmailValid: true
                })
            }
        }
    }
    const handleChangeName = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9]+$/;
        if (regex.test(value)) {
            setErrorNameMessage({
                ...errorNameMessage,
                nameError: ""
            });
            setName({
                ...name,
                value: value,
                isNameValid: true
            })
        } else {
            setErrorNameMessage({
                ...errorNameMessage,
                nameError: "Name not consist of speacial characters"
            });
            setName({
                ...name,
                value: value,
                isNameValid: false
            });
        }
    }
    const handleChangePassword = (e) => {
        const value = e.target.value;
        const regex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (regex.test(value)) {
            setErrorPasswordMessage({
                ...errorPasswordMessage,
                passwordError: ""
            });
            setPassword({
                ...password,
                value: value,
                isPasswordValid: true
            });
        } else {
            setErrorPasswordMessage({
                ...errorPasswordMessage,
                passwordError: "Password contains at least one uppercase letter and one special character."
            });
            setPassword({
                ...password,
                value: value,
                isPasswordValid: false
            });
        }
    }
    const handleChangeRepeatPassword = (e) => {
        const value = e.target.value;
        if (password.value === value) {
            setErrorRepeatPasswordMessage({
                ...errorRepeatPasswordMessage,
                repeatPasswordError: ""
            });
            setRepeatPassword({
                ...repeatPassword,
                value: value,
                isRepeatPasswordValid: true
            });
        } else {
            setErrorRepeatPasswordMessage({
                ...errorRepeatPasswordMessage,
                repeatPasswordError: "Not Match"
            });
            setRepeatPassword({
                ...repeatPassword,
                value: value,
                isRepeatPasswordValid: false
            });
        }
    }
    const handleSubmit = () => {
        console.log("emai : " + email.isEmailValid);
        console.log("name : " + name.isNameValid);
        console.log("pass : " + password.isPasswordValid);
        console.log("repeat : " + repeatPassword.isRepeatPasswordValid);
        if (email?.isEmailValid && name?.isNameValid
            && password.isPasswordValid && repeatPassword.isRepeatPasswordValid) {
            setUser({
                email: email.value,
                name: name.value,
                password: password.value
            });
        }
    }
    const fetchRegister = async (user) => {
        let result = await authApi.register(user);
        if (result != null) {
            alert("Register Success. Do you want back to login in 3s");
            setTimeout(() => { navigate('/login') }, 3000);
        } else {
            alert("Register Fail. Back to register again in 3s");
            setTimeout(() => {
                // eslint-disable-next-line no-restricted-globals
                history.go(0)
            }, 3000);
        }
    }
    useEffect(() => {
        if (user != null) {
            fetchRegister(user);
        }
    }, [user])
    return (
        <>
            <div className="sign-in-page">
                <div className="container">
                    <div className="row justify-content-center align-items-center height-self-center">
                        <div className="col-lg-7 col-md-12 align-self-center">
                            <div className="sign-user_card ">
                                <div className="sign-in-page-data">
                                    <div className="sign-in-from w-100 m-auto">
                                        <form className="">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail23">E-mail</label>
                                                        <input
                                                            type="email"
                                                            className="form-control mb-0"
                                                            id="exampleInputEmail23"
                                                            placeholder="Enter email"
                                                            onChange={handleChangeEmail}
                                                            onBlur={handleBlurEmail}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{ color: '#e87c03' }}>{errorEmailMessage?.emailError}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail35">Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-0"
                                                            id="exampleInputEmail35"
                                                            placeholder="Enter name"
                                                            onChange={handleChangeName}
                                                        />
                                                    </div>
                                                    <div style={{ color: '#e87c03' }}>{errorNameMessage?.nameError}</div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword2">Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control mb-0"
                                                            id="exampleInputPassword2"
                                                            placeholder="Password"
                                                            onChange={handleChangePassword}
                                                        />
                                                    </div>
                                                    <div style={{ color: '#e87c03' }}>{errorPasswordMessage?.passwordError}</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Repeat Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control mb-0"
                                                            id="exampleInputPassword3"
                                                            placeholder="Password"
                                                            onChange={handleChangeRepeatPassword}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{ color: '#e87c03' }}>{errorRepeatPasswordMessage?.repeatPasswordError}</div>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio mt-2">
                                                <input
                                                    type="radio"
                                                    id="customRadio1"
                                                    name="customRadio"
                                                    className="custom-control-input"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customRadio1"
                                                >
                                                    Premium-$39 / 3 Months with a 5 day free trial
                                                </label>
                                            </div>
                                            <div className="custom-control custom-radio mt-2">
                                                <input
                                                    type="radio"
                                                    id="customRadio2"
                                                    name="customRadio"
                                                    className="custom-control-input"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customRadio2"
                                                >
                                                    {" "}
                                                    Basic- $19 / 1 Month
                                                </label>
                                            </div>
                                            <div className="custom-control custom-radio mt-2">
                                                <input
                                                    type="radio"
                                                    id="customRadio3"
                                                    name="customRadio"
                                                    className="custom-control-input"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customRadio3"
                                                >
                                                    Free-Free
                                                </label>
                                            </div>
                                            <button type="button" className="btn btn-hover my-2" onClick={handleSubmit}>
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-center links">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-primary ml-2">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SignUp;
