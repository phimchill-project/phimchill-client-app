import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Row, Col, Container, Button } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import publicApi from "../../../api/publicApi/exportPublicApi";

// install Swiper modules
SwiperCore.use([Navigation]);

const MoviePage = () => {
    const [blockbusterList, setBlockbusterList] = useState([]);
    const [upcomingMovieslist,setupcomingMovieslist] = useState([]);
    const [TopMoviesByViewslist,settopMoviesByViews] = useState([]);
    const [moviesbyImbdTop , setmoviesbyImbdTop] = useState([]);

    const fetchApiBlockbusterMovies = async () => {
        const result = await publicApi.getBlockbusterMovies();
        setBlockbusterList(result);
    }
    useEffect(() => {
        fetchApiBlockbusterMovies();
    }, [])
    console.log(blockbusterList)

    const fetchApiUpcomingMovies = async () => {
        const result = await publicApi.getUpcomingMovieslist();
        setupcomingMovieslist(result);
    }
    useEffect(() => {
        fetchApiUpcomingMovies();
    },[])
    console.log(upcomingMovieslist)

    const fetchApiMoviesbyImbdTop = async () =>{
        const result = await publicApi.getMoviesbyImbdTop();
        setmoviesbyImbdTop(result);
    }
    useEffect(()=>{
        fetchApiMoviesbyImbdTop();
    },[])
    console.log(moviesbyImbdTop)

    const fetchApiTopMoviesByViews = async () =>{
        const result = await publicApi.getTopMoviesByViewslist();
        settopMoviesByViews(result);
    }
    useEffect(()=>{
        fetchApiTopMoviesByViews();
    },[])
    console.log(TopMoviesByViewslist)

    return (
        <div>
            <section id="movieshow" className="iq-main-slider p-0">
                <div id="prev" className="swiper-button swiper-button-prev"><i className= "ri-arrow-left-s-line"></i></div>
                <div id="next" className="swiper-button swiper-button-next"><i className= "ri-arrow-right-s-line"></i></div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={0}
                    centeredSlides={true}
                    navigation={{
                        prevEl: '#prev',
                        nextEl: '#next'
                    }}
                    loop={true}
                    className="">
                    {}
                    { TopMoviesByViewslist.map( (movie, index) => (
                        <SwiperSlide>
                        <Link to="/movie-details">
                            <div className="shows-img">
                                <img src={movie?.image} className="w-100 img1" alt=""/>
                                <div className="shows-content">
                                    <h4 className="text-white mb-1">{movie?.name}</h4>
                                    <div className="movie-time d-flex align-items-center">
                                        <div className="badge badge-secondary p-1 mr-2">{movie?.year}</div>
                                        <span className="text-white">{movie?.duration} phút</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>))}

                </Swiper>
            </section>
            <div className="main-content">
                <section id="iq-favorites">
                    <Container fluid>
                        <Row>
                            <Col sm="12" className="overflow-hidden">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h4 className="main-title">Blockbusters</h4>
                                </div>
                                <div id="favorites-contens">
                                    <div id="prev1" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                    <div id="next1" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
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
                                        { blockbusterList.map( (movie, index) => (
                                            <SwiperSlide className="slide-item" key={index}>
                                                <div className="block-images1 block-images position-relative">
                                                    <div className="img-box">
                                                        <img src={movie?.image} className="img-fluid" alt=""/>
                                                        {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                    </div>
                                                    <div className="block-description">
                                                        <h6 className="iq-title"><Link to="/show-details">{movie?.name}</Link></h6>
                                                        <div className="movie-time d-flex align-items-center my-2">
                                                            {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                            <span className="text-white">{movie?.duration}</span>
                                                        </div>
                                                        <div className="hover-buttons">
                                                            <Link to="/show-details" role="button" className="btn btn-hover">
                                                                <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                                Play Now
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
                                                                        <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                                        <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                                        <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
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
                                    <div id="prev2" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div> 
                                    <div id="next2" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
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
                                        { upcomingMovieslist.map( (movie, index) => (
                                            <SwiperSlide className="slide-item" key={index}>
                                                <div className="block-images1 block-images position-relative">
                                                    <div className="img-box">
                                                        <img src={movie?.image} className="img-fluid" alt=""/>
                                                        {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                    </div>
                                                    <div className="block-description">
                                                        <h6 className="iq-title"><Link to="/show-details">{movie?.name}</Link></h6>
                                                        <div className="movie-time d-flex align-items-center my-2">
                                                            {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                            <span className="text-white">{movie?.duration}</span>
                                                        </div>
                                                        <div className="hover-buttons">
                                                            <Link to="/show-details" role="button" className="btn btn-hover">
                                                                <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                                Play Now
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
                                                                        <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                                        <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                                        <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
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
                                    <div id="prev3" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
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
                                        { TopMoviesByViewslist.map( (movie, index) => (
                                            <SwiperSlide className="slide-item" key={index}>
                                                <div className="block-images1 block-images position-relative">
                                                    <div className="img-box">
                                                        <img src={movie?.image} className="img-fluid" alt=""/>
                                                        {/*<img src={img1} className="img-fluid" alt=""/>*/}
                                                    </div>
                                                    <div className="block-description">
                                                        <h6 className="iq-title"><Link to="/show-details">{movie?.name}</Link></h6>
                                                        <div className="movie-time d-flex align-items-center my-2">
                                                            {/*<div className="badge badge-secondary p-1 mr-2">5+</div>*/}
                                                            <span className="text-white">{movie?.duration}</span>
                                                        </div>
                                                        <div className="hover-buttons">
                                                            <Link to="/show-details" role="button" className="btn btn-hover">
                                                                <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                                Play Now
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
                                                                        <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                                        <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                                        <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
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
        </div>
    )
}
export default MoviePage;