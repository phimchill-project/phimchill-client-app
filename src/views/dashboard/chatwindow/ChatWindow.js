import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { Container } from 'react-bootstrap';
import axios from 'axios';

function ChatWindow() {
      const [stomClient, setStompClient] = useState();
      const [isConnect, setIsConnect] = useState(false);
      const [message, setMessage] = useState({
            content: "",
            dateSend: "",
            replyToUserId: ""
      });
      const [messageList, setMessageList] = useState([]);
      const [userChatList, setUserChatList] = useState([]);
      const [replyToUser, setReplyToUser] = useState(null);
      const [content, setContent] = useState();
      const connect = () => {
            const token = localStorage.getItem("token");

            const socket = new SockJS("http://localhost:8080/ws");
            const temp = over(socket);
            setStompClient(temp);

            const headers = {
                  Authorization: "Bearer " + token
            }
      }
      const onError = (error) => {
            console.log(error);
      }
      const onConnect = () => {
            setIsConnect(true)
      }

      const fetchUserChat = async () => {
            const token = localStorage.getItem("token");
            let result = null;
            try {
                  result = await axios.get("http://localhost:8080/api/users/all",
                        {
                              headers: {
                                    Authorization: "Bearer " + token
                              }
                        }
                  )
                  setUserChatList(result?.data.data);
            } catch (e) {
                  console.log(e);
            }
      }
      const handleReplyToUser = (userId) => {
            setReplyToUser(userId);
      }
      const fetchMessageList = async () => {
            const token = localStorage.getItem("token");
            let result = null;
            try {
                  result = await axios.get(`http://localhost:8080/api/message/${replyToUser}`,
                        {
                              headers: {
                                    Authorization: "Bearer " + token
                              }
                        }
                  )
                  setMessageList(result?.data.data);
                  console.log(result);
            } catch (e) {
                  console.log(e);
            }
      }
      useEffect(() => {
            if (message && stomClient) {
                  setMessage({

                  })
                  stomClient?.send("/app/message", {}, JSON.stringify)
            }
      }, [message]);
      useEffect(() => {
            fetchUserChat();
      }, [])
      useEffect(() => {
            if (replyToUser != null) {
                  fetchMessageList();
            }
      }, [replyToUser])
      return (
            <>
                  <Container fluid>
                        <section className="gradient-custom">
                              <div className="container py-8">
                                    <div className="row">
                                          <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                                                <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>
                                                <div className="card mask-custom">
                                                      <div className="card-body">
                                                            <ul className="list-unstyled mb-0">
                                                                  {userChatList?.map((user, index) => (
                                                                        <li key={index}
                                                                              className="p-2 border-bottom"
                                                                              style={{
                                                                                    borderBottom: "1px solid rgba(255,255,255,.3) !important"
                                                                              }}
                                                                              onClick={() => {
                                                                                    handleReplyToUser(user?.id);
                                                                              }}
                                                                        >
                                                                              <a

                                                                                    className="d-flex justify-content-between link-light"
                                                                              >
                                                                                    <div className="d-flex flex-row">
                                                                                          <img
                                                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                                                                                // src={user?.image}
                                                                                                alt="avatar"
                                                                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                                                width={60}
                                                                                          />
                                                                                          <div className="pt-1">
                                                                                                <p className="fw-bold mb-0" style={{ marginLeft: 10, marginTop: 17 }}>{user?.name}</p>
                                                                                                {/* <p className="small text-white">Hello, Are you there?</p> */}
                                                                                          </div>
                                                                                    </div>
                                                                                    {/* <div className="pt-1">
                                                                                    <p className="small text-white mb-1">Just now</p>
                                                                                    <span className="badge bg-danger float-end">1</span>
                                                                              </div> */}
                                                                              </a>
                                                                        </li>
                                                                  ))}
                                                            </ul>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="col-md-6 col-lg-7 col-xl-7">
                                                <ul className="list-unstyled text-white">
                                                      {messageList?.map((mess, index) => (
                                                            <div>
                                                                  {mess?.userSend?.id == 7 ?
                                                                        // <div key={index}>
                                                                        <li className="d-flex justify-content-between mb-4" key={index}>
                                                                              <div className="card mask-custom w-100">
                                                                                    <div
                                                                                          className="card-header d-flex justify-content-between p-3"
                                                                                          style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                                                                    >
                                                                                          <p className="fw-bold mb-0">{mess?.userSend.name}</p>
                                                                                          <p className="text-light small mb-0">
                                                                                                <i className="far fa-clock" /> 13 mins agosssss
                                                                                          </p>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                          <p className="mb-0">
                                                                                                {mess?.content}
                                                                                          </p>
                                                                                    </div>
                                                                              </div>
                                                                              <img
                                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                                                                    alt="avatar"
                                                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                                                    width={60}
                                                                              />
                                                                        </li>

                                                                        // </div>
                                                                        :
                                                                        // <div key={index}>
                                                                        <li className="d-flex justify-content-between mb-4" key={index}>
                                                                              <img
                                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                                                    alt="avatar"
                                                                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                                                    width={60}
                                                                              />
                                                                              <div className="card mask-custom  w-100">
                                                                                    <div
                                                                                          className="card-header d-flex justify-content-between p-3"
                                                                                          style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                                                                    >
                                                                                          <p className="fw-bold mb-0">{mess?.userSend.name}</p>
                                                                                          <p className="text-light small mb-0">
                                                                                                <i className="far fa-clock" /> 12 mins ago
                                                                                          </p>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                          <p className="mb-0">
                                                                                                {mess?.content}
                                                                                          </p>
                                                                                    </div>
                                                                              </div>
                                                                        </li>
                                                                        // </div>

                                                                  }
                                                            </div>
                                                      ))}


                                                      <li className="mb-3">
                                                            <div className="form-outline form-white">
                                                                  <textarea
                                                                        className="form-control"
                                                                        id="textAreaExample3"
                                                                        rows={4}
                                                                        defaultValue={""}
                                                                        onChange={(e) => {
                                                                              setContent(e.target.value);
                                                                        }}
                                                                  />
                                                                  <label className="form-label" htmlFor="textAreaExample3">
                                                                        Message
                                                                  </label>
                                                            </div>
                                                      </li>

                                                      <button
                                                            type="button"
                                                            className="btn btn-primary btn-lg btn-rounded float-end rounded-pill"
                                                            // onClick={() => {
                                                            //       handleSubmit()
                                                            // }}
                                                      >
                                                            Send
                                                      </button>
                                                </ul>
                                          </div>
                                    </div>
                              </div>
                        </section>

                  </Container>

            </>
      )
}

export default ChatWindow