import React,{ useState,useEffect} from 'react'
import { gsap } from 'gsap'
import {Link, useNavigate} from 'react-router-dom'
import { Container,Col,Row,Nav,Tab, } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

import SeriesContent from "../../../components/ListFilm/MainContent"
import { useDispatch, useSelector } from 'react-redux';
import { getTvSeriesByImdb, getTvSeriesByFavorites, selectImdb, selectFavorites } from '../../../features/tvSeries/tvSeriesSlice';
import {movieApi} from "../../../api/movie/exportMovieApi"
// img
import logo from '../../../assets/ui/images/logo.png'
import icon from '../../../assets/ui/video/trailer.mp4'

import  swiper from "./swiper.scss"




// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade,Navigation,Thumbs,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import publicApi from "../../../api/publicApi/exportPublicApi";
SwiperCore.use([EffectFade,Navigation,Thumbs,Pagination]);

const gsapAnimate = {
    getData: (elem) => {
        const option = {
            opacity: 0,
            scale: 1,
            position: {
                x: 0,
                y:0,
            },
            ease: "",
            duration: 1,
            delay: .4,
            rotate: 0
        }
        if(elem !== undefined) {
            option.position.x = gsapAnimate.validValue(elem.dataset.iqPositionX, 0)

            option.position.y = gsapAnimate.validValue(elem.dataset.iqPositionY, 0)

            option.rotate = gsapAnimate.validValue(elem.dataset.iqRotate, 0)

            option.scale = gsapAnimate.validValue(elem.dataset.iqScale, 1)

            option.opacity = gsapAnimate.validValue(elem.dataset.iqOpacity, 0)

            option.delay = gsapAnimate.validValue(elem.dataset.iqDelay, .4)

            option.duration = gsapAnimate.validValue(elem.dataset.iqDuration, 1.5)

            option.ease = gsapAnimate.validValue(elem.dataset.iqEase, '')

            const setOption = {opacity: option.opacity, scale: option.scale, x: option.position.x, y: option.position.y, ease: option.ease, rotate: option.rotate, duration: option.duration, delay: option.delay}

            return setOption
        } else {
            return {opacity: 0}
        }
    },
    onStart : (elem) => {

        const setOption = gsapAnimate.getData(elem)

        gsap.from(elem, setOption)

    },

    onEnd : (elem) => {

        const setOption = gsapAnimate.getData(elem)

        gsap.to(elem, setOption)

    },

    onStartEnd : (elem) => {

        const setOption = gsapAnimate.getData(elem)

        const setEndOption = gsapAnimate.getData(elem)

        setEndOption.opacity = 1

        setEndOption.x = 0

        setEndOption.y = 0

        setEndOption.rotate = 0

        setEndOption.scale = 1

        gsap.fromTo(elem, setOption, setEndOption)
    },
    validValue: (attr, defaultVal) => {
        if (attr !== undefined && attr !== null) {
            return Number(attr)
        }
        return Number(defaultVal)
    }
}

const Home =()=>{
    //banner
    const navigate = useNavigate();
    const [moviesbyImbdTop, setmoviesbyImbdTop] = useState([]);
    const fetchApiMoviesbyImbdTop = async () => {
        const result = await publicApi.getMoviesbyImbdTop();
        setmoviesbyImbdTop(result);
    }
    useEffect(() => {
        fetchApiMoviesbyImbdTop();
    }, [])

    useEffect(() => {
        dispatch(getTvSeriesByImdb());
        dispatch(getTvSeriesByFavorites());
    }, []);
    //

    const dispatch = useDispatch();
    const imdbSeries = useSelector(selectImdb);
    const favoritesSeries = useSelector(selectFavorites);





    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [toggler1, setToggler1] = useState(false);
    const [toggler2, setToggler2] = useState(false);
    const [toggler3, setToggler3] = useState(false);

    const animationInit = () => {
        if(document.querySelector('.swiper-container .swiper-slide-active') !== null) {

            const gsapElem = document.querySelector('.swiper-container .swiper-slide-active').querySelectorAll('[data-iq-gsap="onStart"]')

            Array.from(gsapElem, (elem) => {
                return gsapAnimate.onStartEnd(elem)
            })
        }
    }


    const options1 = [
        { value: 'season 1', label: 'Season 1' },
        { value: 'season 2', label: 'Season 2' },
        { value: 'season 3', label: 'Season 3' }
    ]

    const options2 = [
        { value: 'season 1', label: 'Season 1' },
        { value: 'season 2', label: 'Season 2' }
    ]

    return(
        <>
            <FsLightbox
                toggler={toggler1}
                sources={[
                    <iframe src={icon} title=" " width="500px" height="200px"
                            frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
                ]}
            />
            <FsLightbox
                toggler={toggler2}
                sources={[
                    <iframe src={icon} title=" " width="500px" height="200px"
                            frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
                ]}
            />
            <FsLightbox
                toggler={toggler3}
                sources={[
                    <iframe src={icon} title=" " width="500px" height="200px"
                            frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
                ]}
            />
            <section id="home" className="iq-main-slider p-0 iq-rtl-direction">
                <div id="prev" className="swiper-button swiper-button-prev"><i className="ri-arrow-left-s-line"></i>
                </div>
                <div id="next" className="swiper-button swiper-button-next"><i className="ri-arrow-right-s-line"></i>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    centeredSlides={true}
                    navigation={{
                        prevEl: '#prev',
                        nextEl: '#next'
                    }}
                    loop={true}
                    className="swiper-container">
                    {imdbSeries?.listTVSeries?.map((element) => (
                        <SwiperSlide key={element.id} className="slide slick-bg s-bg-1" >

                            <Link to={`/movie-detail/${element.name}`}>
                                <div className="shows-content h-100">
                                    <div className="row align-items-center h-100">
                                        <div className="col-lg-7 col-md-12">
                                            <h2
                                                className="slider-text big-title title text-uppercase"
                                                data-animation-in="fadeInLeft"
                                                data-delay-in="0.6"
                                            >
                                                {element?.name}
                                            </h2>
                                            <div
                                                className="flex-wrap align-items-center fadeInLeft animated"
                                                data-animation-in="fadeInLeft"
                                                style={{opacity: 2}}
                                            >
                                                <div className="slider-ratting d-flex align-items-center ">
                                                    <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true"/>
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true"/>
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star" aria-hidden="true"/>
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star-half" aria-hidden="true"/>
                                                        </li>
                                                    </ul>
                                                    <span className="text-white ml-3">{element?.imdb} Imdb</span>
                                                </div>
                                                <div className="d-flex align-items-center movie-banner-time">
                                                    <span className="badge badge-secondary p-2">PG</span>
                                                    <span className="mx-2 mx-md-3">
                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                    </span>
                                                    <span className="trending-time">{element?.seasonList?.length} seasion</span>
                                                    <span className="mx-2 mx-md-3">
                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                    </span>
                                                    <span className="trending-year">{element.year}</span>
                                                </div>
                                                <p
                                                    className="movie-banner-text"
                                                    data-animation-in="fadeInUp"
                                                    data-delay-in="1.2"
                                                >
                                                    {element.description}
                                                </p>

                                            </div>
                                            <div
                                                className="d-flex align-items-center r-mb-23"
                                                // data-animation-in="fadeInUp"
                                                // data-delay-in="1.2"
                                            >
                                                <Link to={`/watch-movie/${element.name}`} className="btn btn-hover iq-button">
                                                    <i className="fa fa-play mr-2" aria-hidden="true"/>
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
                                    <img src={element?.image} className="w-100 img1" style={{height:'450px',width:'1350px',objectFit: 'cover' }} alt=""/>
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
            <div className="main-content">
                <SeriesContent TvSeriesResponse={imdbSeries}/>
                <SeriesContent TvSeriesResponse={favoritesSeries}/>
            </div>
        </>
    )
}


export default Home