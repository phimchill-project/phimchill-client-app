import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
      return (
            <>
                  <footer className="iq-footer">
                        <div className="container-fluid">
                              <div className="row">
                                    <div className="col-lg-6">
                                          <ul className="list-inline mb-0">
                                                <li className="list-inline-item"><Link to="/user-privacy-setting">Privacy Policy</Link></li>
                                                <li className="list-inline-item"><Link to="/user-account-setting">Terms of Use</Link></li>
                                          </ul>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                          Copyright 2020 <Link to="#">Streamit</Link> All Rights Reserved.
                                    </div>
                              </div>
                        </div>
                  </footer>
            </>
      )
}

export default Footer;