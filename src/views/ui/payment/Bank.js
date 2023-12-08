import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPayemnt } from '../../../api/membership/membershipApi'

import { faL } from '@fortawesome/free-solid-svg-icons';

function Bank() {
      // const [email, setEmail] = useParams();
      const [bankCode, setBankCode] = useState()
      const [bankTranNo, setBankTranNo] = useState()
      const [payDate, setPayDate] = useState()
      const [transactionStatus, setTransactionStatus] = useState()
      const [paymentCode, setPaymentCode] = useState()
      // const [payment , setPayment] = useState()
      const [list, setList] = useState([]);
      const navigate = useNavigate();
      const fetchAllBank = async () => {
            let result = null;
            try {
                  result = await axios.get("https://api.vietqr.io/v2/banks")
            } catch (e) {
                  console.log(e);
            }
            if (result != null) {
                  setList(result?.data.data)
            }
      }
      const handlePayment = async () => {
            await createPayemnt();
      }
      useEffect(() => {
            const token = localStorage.getItem("token");
            if (token == null) {
                  navigate("/error404");
            } else {
                  fetchAllBank();
            }
      }, [])
      const fetchPayment = async() => {
            const token = localStorage.getItem("token");
            const payment = {
                  bankCode : bankCode, 
                  bankTranNo : bankTranNo, 
                  payDate : payDate, 
                  transactionStatus : transactionStatus, 
                  paymentCode : paymentCode, 
            }
            let result = null;
            try {
                  result = await axios.post("http://localhost:8080/api/payment/save",
                  payment,
                      {
                          headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                              Authorization: "Bearer " + token
                          }
                      })
                      console.log( result);
              } catch (e) {
                  console.log (e);
                  return null;
            }
            if(transactionStatus == "OO"){
                  alert("The transaction is complete ");
                  navigate("/home")
            }
      }
      const getQueryParams = (url) => {
            const queryString = url.split('?')[1];
            const queryParams = new URLSearchParams(queryString);
            return queryParams;
      };
      useEffect(() => {
            const currentUrl = window.location.href;
            const queryParams = getQueryParams(currentUrl);
            setBankCode(queryParams.get("vnp_BankCode"))
            setBankTranNo(queryParams.get("vnp_BankTranNo"))
            setPayDate(queryParams.get("vnp_PayDate"))
            setTransactionStatus(queryParams.get("vnp_TransactionStatus"))
            setPaymentCode(queryParams.get("vnp_TxnRef"))
            if(bankCode != null){
                  fetchPayment();
            }
      }, [bankCode])
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
                                                      <div className="block-images position-relative" style={{ backgroundColor: "white" }}>
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