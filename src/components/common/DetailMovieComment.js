import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import commentApi from "../../api/comment/exportCommentApi";

function DetailMovieComment({ commentDetail }) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const [user, setUser] = useState(currentUser);
      const [comment, setComment] = useState(commentDetail);
      const [subCommnet, setSubComment] = useState("")
      const [iDTagged, setIDTagged] = useState([]);
      const [commetID, setCommentID] = useState();
      const [isShowTextAreaSubCommemt, setIsShowTextAreaSubCommemt] = useState(false);
      const [isLiked, setIsLiked] = useState(false);
      const handleLikeComment = async (id) => {
            console.log(id);
            await commentApi.likeMovieComment(id);
            fetchAllSubCommentsByCommentId();
      }
      const handleUnLikeComment = async (id) => {
            console.log(id);
            await commentApi.unLikeMovieComment(id);
            fetchAllSubCommentsByCommentId();
      }
      const handleLikeSubComment = async (id) => {
            console.log(id);
            await commentApi.likeMovieSubComment(id);
            fetchAllSubCommentsByCommentId();
      }
      const handleUnLikeSubComment = async (id) => {
            console.log(id);
            await commentApi.unLikeMovieSubComment(id);
            fetchAllSubCommentsByCommentId();
      }
      const handleCommnet = (id, commentID) => {
            setIsShowTextAreaSubCommemt(!isShowTextAreaSubCommemt);
            setIDTagged(id);
            setCommentID(commentID);
      }
      const handleChangeSubComment = (e) => {
            setSubComment(e.target.value);
      }
      const postSubComment = async () => {
            const request = {
                  comment: subCommnet,
                  datePost: new Date(),
                  userID: iDTagged
            };
            const result = await commentApi.postSubCommet(request, commetID)
            if (result == null) {
                  alert("Post comment fail!!!");
            } else {
                  setSubComment("");
                  fetchAllSubCommentsByCommentId();
                  setIsShowTextAreaSubCommemt(!isShowTextAreaSubCommemt);
            }
      }
      const fetchAllSubCommentsByCommentId = async () => {
            const result = await commentApi.getAllSubCommentsByCommentId(comment?.id);
            console.log(result);
            setComment(result?.data);
      }
      // useEffect(() => {
      //       fetchAllSubCommentsByCommentId();
      // },[isPostSuccess])
      return (
            <div>
                  <div className="d-flex flex-start" style={{ marginTop: 19 }}>
                        <img
                              className="rounded-circle shadow-1-strong me-3" style={{ height: 60, width: 60, marginRight: 10, marginTop: -3 }}
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                              alt="avatar"
                              width={65}
                              height={65}
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                              <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                          <p className="mb-1">
                                                {comment?.userDto.name}{" "}
                                                <span className="small">- {comment?.datePost}</span>
                                          </p>
                                    </div>
                                    <p className="small mb-0">
                                          {comment?.comment}
                                    </p>
                                    <div className="small d-flex justify-content-start" style={{ marginTop: 10 }}>
                                          {comment?.listUserIdLiked.includes(user?.id) ?
                                                <div className="d-flex align-items-center me-3" id="like-button" style={{color: "#e50914"}} onClick={() => 
                                                      handleUnLikeComment(comment?.id)
                                                }>
                                                      <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25, marginRight: 10 }} />
                                                      <span> {comment?.totalLike} </span>
                                                </div> :
                                                <div className="d-flex align-items-center me-3" id="like-button" style={{color:  "#d7c4b3"}} onClick={() => 
                                                      handleLikeComment(comment?.id)
                                                } >
                                                      <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25, marginRight: 10}} />
                                                      <span> {comment?.totalLike} </span>
                                                </div>}
                                          <div className="d-flex align-items-center me-3" id="comment-button" onClick={() => handleCommnet(comment?.userDto.id, comment?.id)}>
                                                <FontAwesomeIcon icon={faCommentDots} size="lg" style={{ height: 25, marginLeft: 20 }} />
                                          </div>
                                    </div>
                              </div>
                              {comment?.subCommentDtoList.map((subComment, index) => (
                                    <div className="d-flex flex-start mt-4" key={index}>
                                          <Link className="me-3">
                                                <img
                                                      className="rounded-circle shadow-1-strong"
                                                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" style={{ height: 50, width: 50, marginRight: 10 }}
                                                      alt="avatar"
                                                      width={65}
                                                      height={65}
                                                />
                                          </Link>
                                          <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                      <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-1">
                                                                  {subComment?.userDtoComment.name}{" "}
                                                                  <span className="small">- {subComment?.datePost}{" "}</span>
                                                            </p>
                                                      </div>
                                                      <p className="small mb-0">
                                                            {subComment?.comment}
                                                      </p>
                                                </div>
                                                <div className="small d-flex justify-content-start" style={{ marginTop: 10 }}>
                                                      { subComment?.listUserIdLiked.includes(user?.id) ?
                                                            <div className="d-flex align-items-center me-3" id="like-button" style={{color : "#e50914"}} onClick={() => handleUnLikeSubComment(subComment?.id)}>
                                                                  <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25, marginRight: 10 }} />
                                                                  <span> {subComment?.totalLike} </span>
                                                            </div> :
                                                            <div className="d-flex align-items-center me-3" id="like-button" style={{color : "#d7c4b3"}} onClick={() => {
                                                                  handleLikeSubComment(subComment?.id)
                                                            }}>
                                                                  <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25, marginRight: 10 }} />
                                                                  <span> {subComment?.totalLike} </span>
                                                            </div>
                                                      }
                                                      <div className="d-flex align-items-center me-3" id="comment-button" onClick={() => handleCommnet(subComment?.userDtoComment.id, comment?.id)}>
                                                            <FontAwesomeIcon icon={faCommentDots} size="lg" style={{ height: 25, marginLeft: 20 }} />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                              {isShowTextAreaSubCommemt ? <div
                                    className=" flex-grow-1 flex-shrink-1" style={{ marginTop: 16 }}
                              >
                                    <div className="d-flex flex-start w-100 ">
                                          <div className="form-outline w-100">
                                                <input type="text" className="form-control" id="textAreaExample" rows={4}
                                                      value={subCommnet} onChange={handleChangeSubComment} />
                                          </div>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => postSubComment()}>
                                                Post
                                          </button>
                                    </div>
                              </div> : ""}
                        </div>
                  </div>
            </div>
      )
}

export default DetailMovieComment