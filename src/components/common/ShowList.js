import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import img1 from '../../assets/ui/images/upcoming/01.jpg'

const ShowList = () => {
    const [list, setList] = useState([{
        "name": "Marvin, Goyette and Kautzer",
        "number": "2",
        "id": "1"
       },
       {
        "name": "Farrell, Boehm and Marquardt",
        "number": "8",
        "id": "2"
       },
       {
        "name": "Fritsch Group",
        "number": "1",
        "id": "3"
       },
       {
        "name": "Schmeler and Sons",
        "number": "4",
        "id": "4"
       },
       {
        "name": "Becker - Kling",
        "number": "1",
        "id": "5"
       },
       {
        "name": "Pacocha - Schulist",
        "number": "4",
        "id": "6"
       },
       {
        "name": "Crist, Becker and Hahn",
        "number": "6",
        "id": "7"
       }]);
    // const navigate = useNavigate();
    // const fetchApi = async () => {
    //     let result = null;
    //     try {
    //         result = await axios.get("http://localhost:8080/api/movies");
    //         console.log(result);
    //     } catch (e) {
    //         console.log("Error get list film");
    //     }
    //     if (result != null) {
    //         setList(result.data);
    //     }
    // }
    // useEffect(() => {
    //     fetchApi();
    // }, [])
    return (
        <>
            <main id="main" className="site-main">
                <div className="container-fluid">
                    <div className="iq-main-header d-flex align-items-center justify-content-between mt-5 mt-lg-0">
                        <h4 className="main-title">Videos</h4>
                    </div>
                    <ul className=" row list-inline  mb-0 iq-rtl-direction ">
                        { list?.map( (movie, index) => (
                            <li className="slide-item col-lg-3 mb-4" key={index}>
                                <div className="block-images position-relative">
                                    <div className="img-box">
                                        <img
                                            src={img1}
                                            className="img-fluid"
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="block-description">
                                        <h6 className="iq-title">
                                            <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
                                        </h6>
                                        <div className="movie-time d-flex align-items-center my-2">
                                            <span className="text-white">{movie.duration} minutes</span>
                                        </div>
                                        <div className="hover-buttons">
                                            <Link
                                                className="btn btn-hover"
                                                to={`/movie/${movie.id}`}
                                            >
                                                <i className="fa fa-play mr-1" aria-hidden="true" />
                                                Play Now
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="block-social-info">
                                        <ul className="list-inline p-0 m-0 music-play-lists">
                                            <li className="share">
                                                <span>
                                                    <i className="ri-share-fill" />n  
                                                </span>
                                                <div className="share-box">
                                                    <div className="d-flex align-items-center">
                                                        <Link
                                                            to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="share-ico"
                                                            tabIndex={0}
                                                        >
                                                            <i className="ri-facebook-fill" />
                                                       </Link>
                                                        <Link
                                                            to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="share-ico"
                                                            tabIndex={0}
                                                        >
                                                            <i className="ri-twitter-fill" />
                                                       </Link>
                                                        <Link
                                                            to="#"
                                                            data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                            className="share-ico iq-copy-link"
                                                            tabIndex={0}
                                                        >
                                                            <i className="ri-links-fill" />
                                                       </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="ri-heart-fill" />
                                                </span>
                                                <span className="count-box">2+</span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="ri-add-line" />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}
export default ShowList;