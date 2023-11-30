import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowMovieList = ({ movieList }) => {
    const navigate = useNavigate();
    const [list, setList] = useState(movieList);
    const redirectToWathchingMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/watch-movie/${newName}`)
    }
    const redirectToDetailMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/movie-detail/${newName}`)
    }
    return (
        <>

            <main id="main" className="site-main">
                <div className="container-fluid">
                    <div className="iq-main-header d-flex align-items-center justify-content-between mt-5 mt-lg-0">
                        <h4 className="main-title">Movies</h4>
                    </div>
                    {list != null ?
                        <ul className=" row list-inline  mb-0 iq-rtl-direction ">
                            {list?.map((movie, index) => (
                                <li className="slide-item col-lg-3 mb-4" key={index}>
                                    <div className="block-images position-relative">
                                        <div className="img-box">
                                            <img
                                                src={movie.image}
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
                                                <Link role="button" className="btn btn-hover" onClick={(e) => {
                                                    e.preventDefault();
                                                    redirectToWathchingMoviePage(movie?.name)
                                                }}>
                                                    <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                    Play Now
                                                </Link>
                                            </div>
                                            <div className="hover-buttons">
                                                <Link role="button" className="btn btn-hover" onClick={(e) => {
                                                    e.preventDefault();
                                                    redirectToDetailMoviePage(movie?.name)
                                                }}>
                                                    <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                    More details
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
                    : ""}
                </div>
            </main> :
        </>
    )
}
export default ShowMovieList;