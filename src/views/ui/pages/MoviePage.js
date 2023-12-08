import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import publicApi from "../../../api/publicApi/exportPublicApi";

// install Swiper modules
SwiperCore.use([Navigation]);

const MoviePage = () => {
    const [blockbusterList, setBlockbusterList] = useState([]);
    const [upcomingMovieslist, setupcomingMovieslist] = useState([]);
    const [TopMoviesByViewslist, settopMoviesByViews] = useState([]);
    const [moviesbyImbdTop, setmoviesbyImbdTop] = useState([]);
    const navigate = useNavigate();
    const fetchApiBlockbusterMovies = async () => {
        const result = await publicApi.getBlockbusterMovies();
        setBlockbusterList(result);
    }
    useEffect(() => {
        fetchApiBlockbusterMovies();
    }, [])
    const fetchApiUpcomingMovies = async () => {
        const result = await publicApi.getUpcomingMovieslist();
        setupcomingMovieslist(result);
    }
    useEffect(() => {
        fetchApiUpcomingMovies();
    }, [])
    const fetchApiMoviesbyImbdTop = async () => {
        const result = await publicApi.getMoviesbyImbdTop();
        setmoviesbyImbdTop(result);
    }
    useEffect(() => {
        fetchApiMoviesbyImbdTop();
    }, [])
    const fetchApiTopMoviesByViews = async () => {
        const result = await publicApi.getTopMoviesByViewslist();
        settopMoviesByViews(result);
    }
    useEffect(() => {
        fetchApiTopMoviesByViews();
    }, [])
    const redirectToWathchingMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/watch-movie/${newName}`)
    }
    const redirectToDetailMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/movie-detail/${newName}`)
    }
    return (
        <div>
            <section id="movieshow" className="iq-main-slider p-0">
                <div id="prev" className="swiper-button swiper-button-prev"><i className="ri-arrow-left-s-line"></i>
                </div>
                <div id="next" className="swiper-button swiper-button-next"><i className="ri-arrow-right-s-line"></i>
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={0}
                    centeredSlides={true}
                    navigation={{
                        prevEl: '#prev',
                        nextEl: '#next'
                    }}
                    loop={true}
                    className="" >
                    { }
                    {TopMoviesByViewslist?.map((movie, index) => (
                        <SwiperSlide key={index} >
                            <Link to={`/movie-detail/${movie.name}`}>
                                <div className="shows-content h-100">
                                    <div className="row align-items-center h-100">
                                        <div className="col-lg-7 col-md-12">
                                            <h2
                                                className="slider-text big-title title text-uppercase"
                                                data-animation-in="fadeInLeft"
                                                data-delay-in="0.6"
                                            >
                                                {movie?.name}
                                            </h2>
                                            <div
                                                className="flex-wrap align-items-center fadeInLeft animated"
                                                data-animation-in="fadeInLeft"
                                                style={{ opacity: 2 }}
                                            >
                                                <div className="slider-ratting d-flex align-items-center ">
                                                    <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true" />
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true" />
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true" />
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star-half" aria-hidden="true" />
                                                        </li>
                                                    </ul>
                                                    <span className="text-white ml-3">{movie?.imdb} Imdb</span>
                                                </div>
                                                <div className="d-flex align-items-center movie-banner-time">
                                                    <span className="badge badge-secondary p-2">PG</span>
                                                    <span className="mx-2 mx-md-3">
                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                    </span>
                                                    <span className="trending-time">{movie?.duration} minutes</span>
                                                    <span className="mx-2 mx-md-3">
                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                    </span>
                                                    <span className="trending-year">{movie.year}</span>
                                                </div>
                                                <p
                                                    className="movie-banner-text"
                                                    data-animation-in="fadeInUp"
                                                    data-delay-in="1.2"
                                                >
                                                    {movie.description}
                                                </p>

                                            </div>
                                            <div
                                                className="d-flex align-items-center r-mb-23"
                                            // data-animation-in="fadeInUp"
                                            // data-delay-in="1.2"
                                            >
                                                <Link to={`/watch-movie/${movie.name}`} className="btn btn-hover iq-button">
                                                    <i className="fa fa-play mr-2" aria-hidden="true" />
                                                    Play Now
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-12 trailor-video iq-slider d-none d-lg-block">
                                            <a href="video/trailer.mp4" className="video-open playbtn" tabIndex={0}>
                                                <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    width="80px"
                                                    height="80px"
                                                    viewBox="0 0 213.7 213.7"
                                                    enableBackground="new 0 0 213.7 213.7"
                                                    xmlSpace="preserve"
                                                >
                                                    <polygon
                                                        className="triangle"
                                                        fill="none"
                                                        strokeWidth={7}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        points="73.5,62.5 148.5,105.8 73.5,149.1 "
                                                    />
                                                    <circle
                                                        className="circle"
                                                        fill="none"
                                                        strokeWidth={7}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        cx="106.8"
                                                        cy="106.8"
                                                        r="103.3"
                                                    ></circle>
                                                </svg>
                                                <span className="w-trailor text-uppercase">Watch Trailer</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="shows-img">
                                    <img src={movie?.image} className="w-100 img1" alt="" />
                                    <div className="shows-content">


                                        <div className="d-flex align-items-center movie-banner-time">
                                            {/*<span className="badge badge-secondary p-2">PG</span>*/}
                                            {/*<span className="mx-2 mx-md-3">*/}
                                            {/*            <i className="ri-checkbox-blank-circle-fill"></i>*/}
                                            {/*        </span>*/}
                                            {/*<span className="trending-time">{movie?.duration} minutes</span>*/}
                                            {/*<span className="mx-2 mx-md-3">*/}
                                            {/*            <i className="ri-checkbox-blank-circle-fill"></i>*/}
                                            {/*</span>*/}
                                            {/*<span className="trending-year">{movie?.year}</span>*/}
                                            {/*<p*/}
                                            {/*    className="movie-banner-text"*/}
                                            {/*    data-animation-in="fadeInUp"*/}
                                            {/*    data-delay-in="1.2"*/}
                                            {/*>*/}
                                            {/*    {movie.description}*/}
                                            {/*</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>))}

                </Swiper>
            </section>
            <section id="iq-favorites">
                <Container fluid>
                    <Row>
                        <Col sm="12" className="overflow-hidden">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="main-title">Blockbusters</h4>
                            </div>
                            <div id="favorites-contens">
                                <div id="prev1" className="swiper-button swiper-button-prev"><i
                                    className="fa fa-chevron-left"></i></div>
                                <div id="next1" className="swiper-button swiper-button-next"><i
                                    className="fa fa-chevron-right"></i></div>
                                <Swiper
                                    spaceBetween={20}
                                    navigation={{
                                        nextEl: '#prev1',
                                        prevEl: '#next1'
                                    }}
                                    loop={true}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        550: { slidesPerView: 2 },
                                        991: { slidesPerView: 3 },
                                        1400: { slidesPerView: 4 },
                                    }}
                                    className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction">
                                    {blockbusterList?.map((movie, index) => (
                                        <SwiperSlide className="slide-item" key={index}>
                                            <div className="block-images1 block-images position-relative">
                                                <div className="img-box">
                                                    <img src={movie?.image} className="img-fluid" alt="" />
                                                    {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                </div>
                                                <div className="block-description">
                                                    <h6 className="iq-title"><Link
                                                        to="/show-details">{movie?.name}</Link></h6>
                                                    <div className="movie-time d-flex align-items-center my-2">
                                                        {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                        <span
                                                            className="text-white">{movie?.duration} minutes</span>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link role="button" className="btn btn-hover"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                redirectToWathchingMoviePage(movie?.name)
                                                            }}>
                                                            <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                            Play Now
                                                        </Link>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link role="button" className="btn btn-hover"
                                                            onClick={(e) => {
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
                                                                <i className="ri-share-fill"></i>
                                                            </span>
                                                            <div className="share-box">
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-facebook-fill"></i></Link>
                                                                    <Link
                                                                        to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-twitter-fill"></i></Link>
                                                                    <Link to="#"
                                                                        data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        className="share-ico iq-copy-link"
                                                                        tabIndex="0"><i
                                                                            className="ri-links-fill"></i></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><i className="ri-heart-fill"></i></span>
                                                            <span className="count-box">19+</span>
                                                        </li>
                                                        <li>
                                                            <span>
                                                                <i className="ri-add-line"></i>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id="iq-upcoming-movie">
                <Container fluid>
                    <Row>
                        <Col sm="12" className="overflow-hidden">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="main-title">Upcoming Movies</h4>
                            </div>
                            <div id="upcoming-contens">
                                <div id="prev2" className="swiper-button swiper-button-prev"><i
                                    className="fa fa-chevron-left"></i></div>
                                <div id="next2" className="swiper-button swiper-button-next"><i
                                    className="fa fa-chevron-right"></i></div>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={20}
                                    navigation={{
                                        prevEl: '#prev2',
                                        nextEl: '#next2',
                                    }}
                                    loop={true}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        550: { slidesPerView: 2 },
                                        991: { slidesPerView: 3 },
                                        1400: { slidesPerView: 4 },
                                    }}
                                    className="favorites-slider list-inline row p-0 m-0 iq-rtl-direction">
                                    {upcomingMovieslist?.map((movie, index) => (
                                        <SwiperSlide className="slide-item" key={index}>
                                            <div className="block-images1 block-images position-relative">
                                                <div className="img-box">
                                                    <img src={movie?.image} className="img-fluid" alt="" />
                                                    {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                </div>
                                                <div className="block-description">
                                                    <h6 className="iq-title"><Link
                                                        to="/show-details">{movie?.name}</Link></h6>
                                                    <div className="movie-time d-flex align-items-center my-2">
                                                        {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                        <span
                                                            className="text-white">{movie?.duration} minutes</span>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <div className="hover-buttons">
                                                            <Link role="button" className="btn btn-hover"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    redirectToWathchingMoviePage(movie?.name)
                                                                }}>
                                                                <i className="fa fa-play mr-1"
                                                                    aria-hidden="true"></i>
                                                                Play Now
                                                            </Link>
                                                        </div>
                                                        <div className="hover-buttons">
                                                            <Link role="button" className="btn btn-hover"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    redirectToDetailMoviePage(movie?.name)
                                                                }}>
                                                                <i className="fa fa-play mr-1"
                                                                    aria-hidden="true"></i>
                                                                More details
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block-social-info">
                                                    <ul className="list-inline p-0 m-0 music-play-lists">
                                                        <li className="share">
                                                            <span>
                                                                <i className="ri-share-fill"></i>
                                                            </span>
                                                            <div className="share-box">
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-facebook-fill"></i></Link>
                                                                    <Link
                                                                        to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-twitter-fill"></i></Link>
                                                                    <Link to="#"
                                                                        data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        className="share-ico iq-copy-link"
                                                                        tabIndex="0"><i
                                                                            className="ri-links-fill"></i></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><i className="ri-heart-fill"></i></span>
                                                            <span className="count-box">19+</span>
                                                        </li>
                                                        <li>
                                                            <span>
                                                                <i className="ri-add-line"></i>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id="iq-suggestede">
                <Container fluid>
                    <Row>
                        <Col sm="12" className="overflow-hidden">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="main-title">Top 10 Movie</h4>
                            </div>
                            <div id="suggestede-contens">
                                <div id="prev3" className="swiper-button swiper-button-prev"><i
                                    className="fa fa-chevron-left"></i></div>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={20}
                                    navigation={{
                                        prevEl: '#prev3',
                                        nextEl: '#next3'

                                    }}
                                    loop={true}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        550: { slidesPerView: 2 },
                                        991: { slidesPerView: 3 },
                                        1400: { slidesPerView: 4 },
                                    }}
                                    className="list-inline favorites-slider row p-0 m-0 iq-rtl-direction">
                                    {TopMoviesByViewslist.map((movie, index) => (
                                        <SwiperSlide className="slide-item" key={index}>
                                            <div className="block-images1 block-images position-relative">
                                                <div className="img-box">
                                                    <img src={movie?.image} className="img-fluid" alt="" />
                                                    {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                </div>
                                                <div className="block-description">
                                                    <h6 className="iq-title"><Link
                                                        to="/show-details">{movie?.name}</Link></h6>
                                                    <div className="movie-time d-flex align-items-center my-2">
                                                        {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                        <span
                                                            className="text-white">{movie?.duration} minutes</span>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link role="button" className="btn btn-hover"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                redirectToWathchingMoviePage(movie?.name)
                                                            }}>
                                                            <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                            Play Now
                                                        </Link>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link role="button" className="btn btn-hover"
                                                            onClick={(e) => {
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
                                                                <i className="ri-share-fill"></i>
                                                            </span>
                                                            <div className="share-box">
                                                                <div className="d-flex align-items-center">
                                                                    <Link
                                                                        to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-facebook-fill"></i></Link>
                                                                    <Link
                                                                        to="https://twitter.com/intent/tweet?text=Currentlyreading"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="share-ico" tabIndex="0"><i
                                                                            className="ri-twitter-fill"></i></Link>
                                                                    <Link to="#"
                                                                        data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                                                                        className="share-ico iq-copy-link"
                                                                        tabIndex="0"><i
                                                                            className="ri-links-fill"></i></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><i className="ri-heart-fill"></i></span>
                                                            <span className="count-box">19+</span>
                                                        </li>
                                                        <li>
                                                            <span>
                                                                <i className="ri-add-line"></i>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}
export default MoviePage;