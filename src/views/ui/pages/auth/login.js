import React, {useEffect, useState} from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import authApi from "../../../../api/authApi/exportAuthApi";
import {Link, useNavigate} from 'react-router-dom'
import styles from './Login.module.scss';
import clsx from "clsx";

function Login(){
    let navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPass, setFocusPass] = useState(false);
    const [focusPassNow, setFocusPassNow] = useState(false);
    const [typePass, setTypePass] = useState(true);

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
        if(data.data.statusCode === 200){
             localStorage.setItem("token",data.data.data.token)
            navigate("/");
        }
    }


    const handleBlurPass = () => {
        setFocusPass(true)
        setFocusPassNow(false)
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
                                                              className="form-control mb-0"
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
                                            <div className={clsx("d-flex", styles.div_pass, {[styles.div_pass_focus] : focusPassNow, [styles.div_pass_error] : errorPass})}>
                                                <Form.Group className="flex-grow-1" style={{border: 'none'}}>
                                                    <Form.Control type={typePass ? 'password' : 'text'}
                                                                  value={Pass}
                                                                  className={clsx("form-control mb-0", styles.pass)}
                                                                  placeholder="Password"
                                                                  onChange={(event) => {
                                                                      setPass(event.target.value);
                                                                  }}
                                                                  onFocus={() => setFocusPassNow(true)}
                                                                  onBlur={handleBlurPass}
                                                                  required/>
                                                </Form.Group>
                                                <Button hidden={!focusPassNow} className={clsx(styles.btn_pass)}
                                                        onMouseDown={(event) => {
                                                            event.preventDefault();
                                                            setTypePass(!typePass);
                                                        }}
                                                        onMouseUp={(event) => {
                                                            event.preventDefault();
                                                        }}
                                                >{typePass ? 'Hide' : 'Show'}</Button>
                                            </div>
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