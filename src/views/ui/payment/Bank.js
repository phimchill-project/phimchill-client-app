import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {createPayemnt} from '../../../api/membership/membershipApi'

function Bank() {
      const [list, setList] = useState([]);
      const navigate = useNavigate();
      const fetchAllBank = async () => {
            let result = null;
            try{
                  result = await axios.get("https://api.vietqr.io/v2/banks")
            }catch (e){
                  console.log(e);
            }
            if(result != null){
                  setList(result?.data.data)
            }
      }
      const handlePayment = async () => {
            await createPayemnt();
      }
      useEffect(() => {
            let token = localStorage.getItem("token");
            if(token == null) {
                  navigate("/error404");
            }else{
                  fetchAllBank();
            }
      },[])
      console.log(list);
      return (
            <main id="main" className="genres-main">
                  <div className="container-fluid">
                        <div className="iq-main-header d-flex align-items-center justify-content-between mt-5 mt-lg-0">
                              <h4 className="main-title">Please Choose Your Bank</h4>
                        </div>
                        {list != null ?
                              <ul className=" row list-inline  mb-0 iq-rtl-direction ">
                                    {list?.map((bank, index) => (
                                          <li className="slide-item col-lg-3 mb-4" key={index}>
                                                <Link type='button' onClick={handlePayment}>
                                                <div className="block-images position-relative" style={{backgroundColor : "white"}}>
                                                      <div className="img-box">
                                                            <img
                                                                  src={bank.logo}
                                                                  className="img-fluid"
                                                                  alt=""
                                                                  loading="lazy"
                                                            />
                                                      </div>
                                                </div>
                                                </Link>
                                          </li>
                                    ))}
                              </ul>
                              : ""}
                  </div>
            </main>
      )
}

export default Bank