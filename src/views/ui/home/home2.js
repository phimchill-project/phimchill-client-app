import React,{ useState,useEffect} from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { Container,Col,Row,Nav,Tab, } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

import SeriesContent from "../../../components/ListFilm/MainContent"
import { useDispatch, useSelector } from 'react-redux';
import { getTvSeriesByImdb, getTvSeriesByFavorites, selectImdb, selectFavorites } from '../../../features/tvSeries/tvSeriesSlice';
import {movieApi} from "../../../api/movie/exportMovieApi"
// img
import logo from '../../../assets/ui/images/logo.png'
import icon from '../../../assets/ui/video/trailer.mp4'





// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade,Navigation,Thumbs,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
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

const Home2 =()=>{

    useEffect(() => {
        dispatch(getTvSeriesByImdb());
        dispatch(getTvSeriesByFavorites());
    }, []);

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
                <div id="prev5" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                <div id="next5" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                <Swiper
                    navigation={{
                        prevEl: '#prev5',
                        nextEl: '#next5'
                    }}
                    pagination={{
                        "clickable":true
                    }}

                    onInit={() => {animationInit()}}
                    onSlideChangeTransitionStart={() => animationInit()}
                    loop={true}
                    id="home-slider"
                    className="slider m-0 p-0">
                    <SwiperSlide className="slide slick-bg s-bg-1">
                        <Container fluid className="position-relative h-100">
                            <div className="slider-inner h-100">
                                <Row className="align-items-center  iq-ltr-direction h-100 ">
                                    <Col xl="6" lg="12" md="12">
                                        <Link to="#">
                                            <div className="channel-logo" data-iq-delay="0.5">
                                                <img src={logo} className="c-logo" alt="streamit"/>
                                            </div>
                                        </Link>
                                        <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">bushland</h1>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star-half" aria-hidden="true"></i>
                                                    </li>
                                                </ul>
                                                <span className="text-white ml-2">4.7(lmdb)</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <span className="badge badge-secondary p-2">18+</span>
                                                <span className="ml-3">2 Seasons</span>
                                            </div>
                                            <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                                dummy text ever since the 1500s.
                                            </p>
                                        </div>
                                        <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                            <div className="text-primary title starring">
                                                Starring: <span className="text-body">Karen Gilchrist, James Earl Jones</span>
                                            </div>
                                            <div className="text-primary title genres">
                                                Genres: <span className="text-body">Action</span>
                                            </div>
                                            <div className="text-primary title tag">
                                                Tag: <span className="text-body">Action, Adventure, Horror</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center r-mb-23" data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                            <Link to="/show-details" className="btn btn-hover iq-button">
                                                <i className="fa fa-play mr-2" aria-hidden="true"></i>Play Now
                                            </Link>
                                            <Link to="/show-details" className="btn btn-link">More details</Link>
                                        </div>
                                    </Col>
                                    <Col xl="5" lg="12" md="12" className="trailor-video text-center">
                                        <Link onClick={() => setToggler1(!toggler1)}  to="/" className="video-open playbtn">
                                            <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                 x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                                                 enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                                                <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                         strokeLinejoin="round" strokeMiterlimit="10"
                                                         points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                                <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                        strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                            </svg>
                                            <span className="w-trailor">Watch Trailer</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </SwiperSlide>
                    <SwiperSlide className="slide slick-bg s-bg-2">
                        <Container fluid className="position-relative h-100">
                            <div className="slider-inner h-100">
                                <Row className="row align-items-center  h-100 iq-ltr-direction">
                                    <Col xl="6" lg="12" md="12">
                                        <Link to="#">
                                            <div className="channel-logo">
                                                <img src={logo} className="c-logo" alt="streamit"/>
                                            </div>
                                        </Link>
                                        <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">sail coaster</h1>
                                        <div className="d-flex flex-wrap align-items-center animated" >
                                            <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3"  data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star-half" aria-hidden="true"></i>
                                                    </li>
                                                </ul>
                                                <span className="text-white ml-2">4.7(lmdb)</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <span className="badge badge-secondary p-2">16+</span>
                                                <span className="ml-3">2h 40m</span>
                                            </div>
                                        </div>
                                        <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                            dummy text ever since the 1500s.
                                        </p>
                                        <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                            <div className="text-primary title starring">
                                                Starring: <span className="text-body">Karen Gilchrist, James Earl Jones</span>
                                            </div>
                                            <div className="text-primary title genres">
                                                Genres: <span className="text-body">Action</span>
                                            </div>
                                            <div className="text-primary title tag">
                                                Tag: <span className="text-body">Action, Adventure, Horror</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center r-mb-23"  data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                            <Link to="/show-details" className="btn btn-hover iq-button"><i className="fa fa-play mr-2"
                                                                                                            aria-hidden="true"></i>Play Now</Link>
                                            <Link to="/show-details" className="btn btn-link">More details</Link>
                                        </div>
                                    </Col>
                                    <div className="col-xl-5 col-lg-12 col-md-12 trailor-video  text-center">
                                        <Link onClick={() => setToggler2(!toggler2)} to="/" className="video-open playbtn">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                 x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                                                 enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                                                <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                         strokeLinejoin="round" strokeMiterlimit="10"
                                                         points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                                <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                        strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                            </svg>
                                            <span className="w-trailor">Watch Trailer</span>
                                        </Link>
                                    </div>
                                </Row>
                            </div>
                        </Container>
                    </SwiperSlide>
                    <SwiperSlide className="slide slick-bg s-bg-3">
                        <Container fluid className="position-relative h-100">
                            <div className="slider-inner h-100">
                                <Row className="align-items-center  h-100 iq-ltr-direction">
                                    <Col xl="6" lg="12" md="12">
                                        <Link to="#">
                                            <div className="channel-logo">
                                                <img src={logo} className="c-logo" alt="streamit"/>
                                            </div>
                                        </Link>
                                        <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">the army</h1>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3"  data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star-half" aria-hidden="true"></i>
                                                    </li>
                                                </ul>
                                                <span className="text-white ml-2">4.7(lmdb)</span>
                                            </div>
                                            <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                <span className="badge badge-secondary p-2">20+</span>
                                                <span className="ml-3">3h</span>
                                            </div>
                                        </div>
                                        <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                            dummy text ever since the 1500s.
                                        </p>
                                        <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                            <div className="text-primary title starring">
                                                Starring: <span className="text-body">Karen Gilchrist, James Earl Jones</span>
                                            </div>
                                            <div className="text-primary title genres">
                                                Genres: <span className="text-body">Action</span>
                                            </div>
                                            <div className="text-primary title tag">
                                                Tag: <span className="text-body">Action, Adventure, Horror</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center r-mb-23"  data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                            <Link to="/show-details" className="btn btn-hover iq-button">
                                                <i className="fa fa-play mr-2" aria-hidden="true"></i>Play Now
                                            </Link>
                                            <Link to="/show-details" className="btn btn-link">More details</Link>
                                        </div>
                                    </Col>
                                    <Col xl="5" lg="12" md="12" className="trailor-video  text-center">
                                        <Link onClick={() => setToggler3(!toggler3)} to="/" className="video-open playbtn">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                 x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                                                 enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                                                <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                         strokeLinejoin="round" strokeMiterlimit="10"
                                                         points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                                <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                                                        strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                            </svg>
                                            <span className="w-trailor">Watch Trailer</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </SwiperSlide>
                </Swiper>
            </section>
            <div className="main-content">
                <SeriesContent TvSeriesResponse={imdbSeries}/>
                <SeriesContent TvSeriesResponse={favoritesSeries}/>
            </div>
        </>
    )
}


export default Home2