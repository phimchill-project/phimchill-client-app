import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function MovieHistoryList() {
    const [movieHistoryList, setMovieHistoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovieHistoryList();
    }, []);

    const fetchMovieHistoryList = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get("http://localhost:8080/api/movies/history/watched-movies", {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setMovieHistoryList(response.data.data);
            } else {
                console.error("Expected an array in the response, but received:", response.data);
            }
        } catch (e) {
            console.error("Error fetching movie history list:", e);
        }
    };

    const redirectToMovieDetailPage = (movieName) => {
        let newName = movieName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(/ /g,"-");
        navigate(`/movie-detail/${newName}`);
    };

    return (
        <main id="main" className="site-main">
            <div className="container-fluid">
                <div className="iq-main-header d-flex align-items-center justify-content-between">
                    <h4 className="main-title">Movie History</h4>
                </div>
                {movieHistoryList.length > 0 ?
                    <ul className="row list-inline mb-0">
                        {movieHistoryList.map((movie, index) => (
                            <li className="slide-item col-lg-3 mb-4" key={index}>
                                <div className="block-images position-relative">
                                    <div className="img-box">
                                        <img src={movie.movieImg} className="img-fluid" alt={movie.movieName} />
                                    </div>
                                    <div className="block-description">
                                        <h6 className="iq-title">
                                            <Link to="#" onClick={() => redirectToMovieDetailPage(movie.movieName)}>{movie.movieName}</Link>
                                        </h6>
                                        <div className="movie-time d-flex align-items-center my-2">
                                            <span className="text-white">{movie.duration} hour(s)</span>
                                        </div>
                                        {/* Additional buttons and actions */}
                                    </div>
                                    {/* Social info and other details, if needed */}
                                </div>
                            </li>
                        ))}
                    </ul>
                    : <p>No movies watched yet.</p>}
            </div>
        </main>
    );
}

export default MovieHistoryList;
