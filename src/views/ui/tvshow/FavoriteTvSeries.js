import React, { useState, useEffect } from 'react'
import ShowTvSeriesList  from '../../../components/common/ShowTvSeriesList'
import favoriteApi from "../../../api/favorite/exportFavorite";
import {Link} from "react-router-dom";

function FavoriteTvSeries() {
    const [list, setList] = useState(null);
    const fetchFavoriteTvSeries = async () => {
        let result = await favoriteApi.getFavoriteTvSeries();
        console.log(result);
        if (result == null) {
            return;
        }
        setList(result);
    }
    console.log(list);
    useEffect(() => {
        setList(null);
        fetchFavoriteTvSeries();
    }, []);

    const fetchDeleteFavoriteTVSeries = async (id) =>{
        await favoriteApi.deleteFavoriteTVSeries(id);
        fetchFavoriteTvSeries();
    }
    return (
        <div>
            <main id="main" className="site-main">
                <div className="container-fluid">
                    <div className="iq-main-header d-flex align-items-center justify-content-between mt-5 mt-lg-0">
                        <h4 className="main-title">TV Series</h4>
                    </div>
                    <ul className=" row list-inline  mb-0 iq-rtl-direction ">
                        { list?.map( (tvseries, index) => (
                            <li className="slide-item col-lg-3 mb-4" key={index}>
                                <div className="block-images position-relative">
                                    <div className="img-box">
                                        <img
                                            src={tvseries.image}
                                            className="img-fluid"
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="block-description">
                                        <h6 className="iq-title">
                                            <Link to={`/movie/${tvseries.id}`}>{tvseries.name}</Link>
                                        </h6>
                                        <div className="movie-time d-flex align-items-center my-2">
                                            <span className="text-white">{tvseries.seasonList.length} Seasons</span>
                                        </div>
                                        <div className="hover-buttons">
                                            <Link
                                                className="btn btn-hover"
                                                to={`/movie/${tvseries.id}`}
                                            >
                                                <i className="fa fa-play mr-1" aria-hidden="true" />
                                                Play Now
                                            </Link>
                                        </div>
                                        <div className="hover-buttons">
                                            <Link
                                                className="btn btn-hover"
                                                to={`/movie/${tvseries.id}`}
                                            >
                                                <i className="fa fa-play mr-1" aria-hidden="true" />
                                                More detaills
                                            </Link>
                                        </div>
                                        <div className="hover-buttons">
                                            <Link role="button" className="btn btn-hover" onClick={(e) => {
                                                e.preventDefault();
                                                fetchDeleteFavoriteTVSeries(tvseries?.id)
                                            }}>
                                                <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                Delete
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
        </div>
    )
}

export default FavoriteTvSeries;