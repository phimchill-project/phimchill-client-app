import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterMemberShip = () => {
    const navigate = useNavigate();
    const handleSubscribe = async () => {
        navigate("/payment");
    }
    return (
        <>
            <main id="main" className="site-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <div className="iq-pricing-card">
                                <div className="table-responsive iq-pricing pt-2">
                                    <table id="my-table" className="table" data-active="premium">
                                        <thead>
                                            <tr>
                                                <th className="text-center iq-price-head"></th>
                                                <th className="text-center iq-price-head free">
                                                    <div className="iq-price-box" style={{ height: 170 }}>
                                                        <div className="iq-price-rate text-white d-flex align-items-end justify-content-center flex-wrap">
                                                            <div className="mr-2 h4">0 VND</div>
                                                            <small> / Months</small>
                                                        </div>
                                                        <span className="type">Free</span>
                                                    </div>
                                                </th>
                                                <th className="text-center iq-price-head premium">
                                                    <div className="iq-price-box ">
                                                        <div className="iq-price-rate text-white  d-flex align-items-end justify-content-center flex-wrap">
                                                            <div className="mr-2 h4">100.000 VND</div>
                                                            <small> / Months</small>
                                                        </div>
                                                        <span className="type">Premium</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    Ad Free Entertainment
                                                </th>
                                                <td className="text-center iq-child-cell">
                                                    <i className="fa fa-times-circle" />
                                                </td>
                                                <td className="text-center iq-child-cell active">
                                                    <i className="fa fa-check-circle" />
                                                </td>

                                            </tr>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    American Tv Shows
                                                </th>
                                                <td className="text-center iq-child-cell">
                                                    <i className="fa fa-times-circle" />
                                                </td>
                                                <td className="text-center iq-child-cell active">
                                                    <i className="fa fa-check-circle" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    Hollywood Movies
                                                </th>
                                                <td className="text-center iq-child-cell">
                                                    <i className="fa fa-times-circle" />
                                                </td>
                                                <td className="text-center iq-child-cell active">
                                                    <i className="fa fa-check-circle" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    New Movies
                                                </th>
                                                <td className="text-center iq-child-cell">
                                                    <i className="fa fa-times-circle" />
                                                </td>
                                                <td className="text-center iq-child-cell active">
                                                    <i className="fa fa-check-circle" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    Streamit Special
                                                </th>
                                                <td className="text-center iq-child-cell">
                                                    <i className="fa fa-times-circle" />
                                                </td>
                                                <td className="text-center iq-child-cell active">
                                                    <i className="fa fa-check-circle" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-center" scope="row">
                                                    {" "}
                                                    Video Quality
                                                </th>
                                                <td className="text-center iq-child-cell">Cannot watch</td>
                                                <td className="text-center iq-child-cell active">
                                                    FHD(1080p)
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-center iq-price-footer" />
                                                <td className="text-center iq-price-footer">
                                                    {/* <div
                                                        className="align-items-center r-mb-23"
                                                        data-animation-in="fadeInUp"
                                                        data-delay-in="1.3"
                                                    >
                                                        <a
                                                            href="../html/sign-up.html"
                                                            className="btn btn-hover iq-button"
                                                        >
                                                            Subscribe
                                                        </a>
                                                    </div> */}
                                                </td>
                                                <td className="text-center iq-price-footer active">
                                                    <div
                                                        className="align-items-center r-mb-23"
                                                        data-animation-in="fadeInUp"
                                                        data-delay-in="1.3"
                                                    >
                                                        <button
                                                            className="btn btn-hover iq-button"
                                                            type='button'
                                                            onClick={handleSubscribe}
                                                        >
                                                            Subscribe
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default RegisterMemberShip;