import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function SignUp() {
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
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control mb-0"
                              id="exampleInputEmail23"
                              placeholder="Enter Full Name"
                              autoComplete="off"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>E-mail</label>
                            <input
                              type="email"
                              className="form-control mb-0"
                              id="exampleInputEmail35"
                              placeholder="Enter email"
                              autoComplete="off"
                              required=""
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control mb-0"
                              id="exampleInputPassword2"
                              placeholder="Password"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Repeat Password</label>
                            <input
                              type="password"
                              className="form-control mb-0"
                              id="exampleInputPassword3"
                              placeholder="Password"
                              required=""
                            />
                          </div>
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
                      <button type="button" className="btn btn-hover my-2">
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary ml-2">
                      Sign In
                    </a>
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
