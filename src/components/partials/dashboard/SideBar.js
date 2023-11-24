import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Button, Dropdown } from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'
import logo from '../../../assets/ui/images/logo.png'
import Card from '../../Card'
import CustomToggle from '../../dropdowns'

const minisidbar = () => {
    document.body.classList.toggle('sidebar-main')
}

const SideBar = (props) => {
    //Collapse state
    // useEffect(
    //     () => {
    //         Scrollbar.init(document.querySelector('#sidebar-scrollbar'))
    //     }
    // )
    return (
        <>
            <div className="iq-sidebar">
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <Link to="/" className="header-logo">
                        <img src={logo} className="img-fluid rounded-normal" alt="" />
                        <div className="logo-title">
                            <span className="text-primary text-uppercase">Streamit</span>
                        </div>
                    </Link>
                    <div className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu" onClick={minisidbar}>
                                <div className="main-circle"><i className="las la-bars"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data-scrollbar" data-scroll="1" id="sidebar-scrollbar">
                    <nav className="iq-sidebar-menu">
                    <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle
                              href="#"
                              as={CustomToggle}
                              variant="search-toggle"
                            >
                              <div
                                className="iq-user-dropdown search-toggle p-0 d-flex align-items-center active"
                                data-toggle="search-toggle"
                              >
                                <img
                                  src={logo}
                                  className="img-fluid avatar-40 rounded-circle"
                                  alt="user"
                                />
                              </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className="iq-sub-dropdown iq-user-dropdown"
                              align="right"
                            >
                              <Card className="shadow-none m-0">
                                <Card.Body className="p-0 pl-3 pr-3">
                                  <Link
                                    to="/manage-profile"
                                    className="iq-sub-card setting-dropdown"
                                  >
                                    <div className="media align-items-center">
                                      <div className="right-icon">
                                        <i className="ri-file-user-line text-primary"></i>
                                      </div>
                                      <div className="media-body ml-3">
                                        <h6 className="my-0 ">
                                          Manage Profile
                                        </h6>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link
                                    to="/setting"
                                    className="iq-sub-card setting-dropdown"
                                  >
                                    <div className="media align-items-center">
                                      <div className="right-icon">
                                        <i className="ri-settings-4-line text-primary"></i>
                                      </div>
                                      <div className="media-body ml-3">
                                        <h6 className="my-0 ">Settings</h6>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link
                                    to="/pricing-plan-1"
                                    className="iq-sub-card setting-dropdown"
                                  >
                                    <div className="media align-items-center">
                                      <div className="right-icon">
                                        <i className="ri-settings-4-line text-primary"></i>
                                      </div>
                                      <div className="media-body ml-3">
                                        <h6 className="my-0 ">Pricing Plan</h6>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link
                                    to="/extra-pages/login"
                                    className="iq-sub-card setting-dropdown"
                                  >
                                    <div className="media align-items-center">
                                      <div className="right-icon">
                                        <i className="ri-logout-circle-line text-primary"></i>
                                      </div>
                                      <div className="media-body ml-3">
                                        <h6 className="my-0 ">Logout</h6>
                                      </div>
                                    </div>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </Dropdown.Menu>
                          </Dropdown>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default SideBar;
