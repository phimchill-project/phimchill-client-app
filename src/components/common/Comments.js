import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import authApi from "../../api/authApi/exportAuthApi";


const ShowComments = (props) => {
    const [comment, setComments] = useState();
    const [commentList, setCommentList] = useState()
    const [isShowTextAreaSubCommemt, setIsShowTextAreaSubCommemt] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const handleLike = (e) => {
        ;
        setIsLiked(!isLiked);
        if (isLiked) {
            document.getElementById("like-button").style.color = "#d7c4b3";
        } else {
            document.getElementById("like-button").style.color = "#e50914";
        }
    }
    const handleCommnet = (e) => {
        setIsShowTextAreaSubCommemt(!isShowTextAreaSubCommemt);
        if (isShowTextAreaSubCommemt) {
            document.getElementById("comment-button").style.color = "#d7c4b3";
        } else {
            document.getElementById("comment-button").style.color = "#e50914";
        }
    }
    const handleChange = (e) => {
        setComments(e.target.value);
    }
    const fetchPostMovieComment = async (request) => {
        return await authApi.postCommentMovie(request);
    }
    const postComment = () => {
        const request = {
            comment: comment,
            datePost: new Date(),
            movieID: 1
        };
        console.log(request);
        const result = fetchPostMovieComment(request);
        console.log("Component" + result);
    }
    return (
        <>
            <section>
                <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8" >
                            <div className="card" style={{ backgroundColor: "#141414" }}>
                                <div className="card-body">
                                    <div className="d-flex flex-start w-100">
                                        <div className="form-outline w-100">
                                            <input type="text" className="form-control" id="textAreaExample" rows={4}
                                                defaultValue={""} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={postComment}>
                                            Post
                                        </button>
                                    </div>
                                    <div className="small d-flex justify-content-start" >
                                        <div className="d-flex align-items-center me-3" id="like-button" onClick={handleLike}>
                                            <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ height: 25 }} />
                                        </div>
                                        <div className="d-flex align-items-center me-3" id="comment-button" onClick={handleCommnet}>
                                            <FontAwesomeIcon icon={faCommentDots} size="lg" style={{ height: 25, marginLeft: 20 }} />
                                        </div>
                                    </div>
                                </div>
                                {isShowTextAreaSubCommemt ? <div
                                    className="card-footer py-3 border-0"

                                >
                                    <div className="d-flex flex-start w-100">
                                        <div className="form-outline w-100">
                                            <input type="text" className="form-control" id="textAreaExample" rows={4}
                                                defaultValue={""} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={postComment}>
                                            Post
                                        </button>
                                    </div>
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShowComments;