import React, { useEffect, useState } from "react";
import commentApi from "../../api/comment/exportCommentApi";
import { useNavigate } from "react-router-dom";
import DetailMovieComment from "./DetailMovieComment";


// const props = 1;
const ShowComments = ({ movieId }) => {
    const [id , setId] = useState(movieId)
    const [comment, setComments] = useState();
    const [commentList, setCommentList] = useState();
    const [isPostSuccess, setIsPostSuccess] = useState(false);
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
    const handleChange = (e) => {
        setComments(e.target.value);
    }
    const fetchPostMovieComment = async (request) => {
        return await commentApi.postCommentMovie(request);
  }
    const postComment = () => {
        const request = {
            comment: comment,
            datePost: new Date(),
            movieId: id
        };
        const result = fetchPostMovieComment(request).then(() => {
            setComments("");
            setIsPostSuccess(!isPostSuccess);
        })
    }
    const fetchAllComments = async () => {
        let result = await commentApi.getAllCommentsByMovieId(id);
        setCommentList(result?.data);
    }
    useEffect(() => {
        fetchAllComments();
    }, [isPostSuccess, id])
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
                                                <DetailMovieComment commentDetail={comment} key={index} />
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