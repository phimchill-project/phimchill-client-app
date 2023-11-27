import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import authApi from "../../api/authApi/exportAuthApi";
import commentApi from "../../api/comment/exportCommentApi";
import { Link, useNavigate } from "react-router-dom";


// const props = 1;
const ShowComments = ({movieId}) => {
    const [idMovie, setIdMovie] = useState(movieId);
    const [comment, setComments] = useState();
    const [subCommnet, setSubComment] = useState()
    const [commentList, setCommentList] = useState();
    const [userIDTagged, setIDTagged] = useState([]);
    const [commetID, setCommentID] = useState();
    const [isShowTextAreaSubCommemt, setIsShowTextAreaSubCommemt] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const handleLike = (e) => {
        // setIsLiked(!isLiked);
        // if (isLiked) {
        //     document.getElementById("like-button").style.color = "#d7c4b3";
        // } else {
        //     document.getElementById("like-button").style.color = "#e50914";
        // }
    }
    const handleCommnet = (id, commentID) => {
        setIsShowTextAreaSubCommemt(!isShowTextAreaSubCommemt);
        setIDTagged(id);
        setCommentID(commentID);  
    }
    const handleChange = (e) => {
        setComments(e.target.value);
    }
    const handleChangeSubComment = (e) => {
        setSubComment(e.target.value);
    }
    const fetchPostMovieComment = async (request) => {
        return await authApi.postCommentMovie(request);
    }
    const fetchPostSubComment = async (request) => {
        return await authApi.postSubCommet(request, commetID);
    }
    const postComment = () => {
        const request = {
            comment: comment,
            datePost: new Date(),
            movieId: movieId
        };
        const result = fetchPostMovieComment(request);
        console.log(result);
        setComments("");
    }
    const postSubComment = () => {
        const request = {
            comment: subCommnet,
            datePost: new Date(),
            userID: userIDTagged
        };
        const result = fetchPostSubComment(request);
        setSubComment("");
    }
    const fetchAllComments = async () => {
        let result = await commentApi.getAllCommentsByMovieId(idMovie);
        setCommentList(result?.data);
    }
    // useEffect(() => {
    //     if(idMovie != null){
    //         fetchAllComments();
    //     }
    // })
    useEffect(() => {
        console.log("aaa", idMovie);
    })
    return (
        <>
            <section>
                <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8" >
                            <div className="card" style={{ backgroundColor: "#141414" }}>
                                <h4 className="text-center mb-4 pb-2">COMMENTS</h4>
                                <div className="card-body">
                                    <div className="d-flex flex-start w-100">
                                        <div className="form-outline w-100">
                                            <input type="text" className="form-control" id="textAreaExample" rows={4}
                                                value={comment} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={postComment}>
                                            Post
                                        </button>
                                    </div>
                                    <div className="row" style={{ marginTop: 20 }}>
                                        <div className="col">
                                            {commentList?.map((comment, index) => (
                                                <div className="d-flex flex-start" key={index} style={{ marginTop: 19 }}>
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
                                                                <div className="d-flex align-items-center me-3" id="like-button" onClick={handleLike}>
                                                                    <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25 }} />  
                                                                </div>
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
                                                                                <span className="small">- 3 hours ago</span>
                                                                            </p>
                                                                        </div>
                                                                        <p className="small mb-0">
                                                                            {subComment?.comment}
                                                                        </p>
                                                                    </div>
                                                                    <div className="small d-flex justify-content-start" style={{ marginTop: 10 }}>
                                                                        <div className="d-flex align-items-center me-3" id="like-button" onClick={handleLike}>
                                                                            <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25 }} />
                                                                        </div>
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
                                                                        defaultValue={""} onChange={handleChangeSubComment} />
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
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShowComments;