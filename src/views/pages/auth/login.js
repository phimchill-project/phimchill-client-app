import React, {useEffect, useState} from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import authApi from "../../../api/authApi/exportAuthApi";
import {get} from "axios";
import config from "../../../config";



function Login(){
    let navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPass, setFocusPass] = useState(false);

    useEffect(() => {
        if (focusEmail){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
            setErrorEmail(!regex.test(Email));
        }
    }, [focusEmail, Email]);

    useEffect(() => {
        if (focusPass){
            const regex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
            setErrorPass(!regex.test(Pass));
        }
    }, [focusPass, Pass]);

    const LoginButton = async () => {
        const data = await authApi.Login({
            email: Email,
            password : Pass,
        });
        console.log(data.data);
        if(data.data.statuscode === 200){
            navigate(config.routes.home);
        }
    }


    return (
        <>
            <section className="sign-in-page">
                <Container>
                    <Row className="justify-content-center align-items-center height-self-center">
                        <Col lg="5" md="12" className="align-self-center">
                            <div className="sign-user_card ">
                                <div className="sign-in-page-data">
                                    <div className="sign-in-from w-100 m-auto">
                                        <h3 className="mb-3 text-center">Sign in</h3>
                                        <Form className="mt-4">
                                            <Form.Group>
                                                <Form.Control type="email"
                                                              value={Email}
                                                              className="form-control mb-0" id="exampleInputEmail1"
                                                              placeholder="Enter email" autoComplete="off"
                                                              onChange={(event) => {
                                                                  setEmail(event.target.value);
                                                              }}
                                                              onBlur={() => setFocusEmail(true)}
                                                              style={{ borderColor: errorEmail ? '#e87c03' : '' }}
                                                              required />
                                            </Form.Group>
                                            <div style={{color: '#e87c03'}} hidden={!errorEmail}>Vui lòng nhập Email chính xác.</div>
                                            <br/>
                                            <Form.Group>
                                                <Form.Control type="password"
                                                              value={Pass}
                                                              className="form-control mb-0" id="exampleInputPassword2"
                                                              placeholder="Password"
                                                              onChange={(event) => {
                                                                  setPass(event.target.value);
                                                              }}
                                                              onBlur={() => setFocusPass(true)}
                                                              style={{ borderColor: errorPass ? '#e87c03' : '' }}
                                                              required/>
                                            </Form.Group>
                                            <div style={{color: '#e87c03'}} hidden={!errorPass}>Mật khẩu của bạn phải chứa từ 8 ký tự, có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt.</div>
                                            <br/>
                                            <div className="sign-info">
                                                <Button onClick={LoginButton} className="btn btn-hover btn-primary1" >Sign in</Button>
                                                <div className="custom-control custom-checkbox d-inline-block">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-center links">
                                        Don't have an account?
                                        <Link to="/register" className="text-primary ml-2">Sign Up</Link>
                                    </div>
                                    <div className="d-flex justify-content-center links">
                                        <Link to="/extra-pages/recover-pswd" className="f-link">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Login;