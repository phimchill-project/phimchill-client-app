import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import categoryApi from "../../api/category/exportCategoryApi";

const ShowMovieList = ({ movieList }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState(movieList);
    const [sort, setSort] = useState();

    const fetchMoviesByCategoryId = async () => {
        let result = await categoryApi.getMoviesByCategoryId(id);
        if (result == null) {
            return;
        }

        switch (sort) {
            case "1": result.sort((a, b) => b.year - a.year); break;
            case "2": result.sort((a, b) => a.year - b.year); break;
            case "3": result.sort((a, b) => b.duration - a.duration); break;
            case "4": result.sort((a, b) => a.duration - b.duration); break;
            case "5": result.sort((a, b) => b.imdb - a.imdb); break;
            case "6": result.sort((a, b) => a.imdb - b.imdb); break;
            default: break;
        }

        setList(result);
    }

    const redirectToWathchingMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/watch-movie/${newName}`)
    }
    const redirectToDetailMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/movie-detail/${newName}`)
    }

    useEffect(() => {
        fetchMoviesByCategoryId();
    }, [sort]);

    return (
        <>
            <main id="main" className="site-main">
                <div className="container-fluid">
                    <div className="iq-main-header d-flex align-items-center justify-content-between mt-5 mt-lg-0">
                        <h4 className="main-title">Movies</h4>
                        <select onChange={(event) => { setSort(event.target.value)}} className="form-control-sm mb-3 text-white" style={{ backgroundColor : "#141414"}}>
                            <option defaultValue value="0">Popular</option>
                            <option value="1">Year Down</option>
                            <option value="2">Year Up</option>
                            <option value="3">Duration Down</option>
                            <option value="4">Duration Up</option>
                            <option value="5">Imdb Down</option>
                            <option value="6">Imdb Up</option>
                        </select>
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
            </main>
        </>
    )
}
export default ShowMovieList;