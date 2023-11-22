import React, {useEffect, useState} from "react";
import { Container,Col,Row,Nav,Tab, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {selectMovies, selectError, setSuccess, selectLoading, getMoviesByImdb} from "../../features/movie/movieSlice";
// img
import logo from '../../assets/images/logo.png'
import icon from '../../assets/video/trailer.mp4'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import  { EffectFade,Navigation,Thumbs,Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import { gsap } from 'gsap'
import {findMoviesImdb} from "../../api/movieAPI/movieAPI";

SwiperCore.use([EffectFade,Navigation,Thumbs,Pagination]);
// cau hinh gsap
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
const HomePage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [toggler1, setToggler1] = useState(false);
    const [toggler2, setToggler2] = useState(false);
    const [toggler3, setToggler3] = useState(false);
    const testimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZw7Qnkg8g59LQwpHB8Qsdrtyts39HNjPulbG2E8QP3Q&s"
    const upcoming= "https://nguoinoitieng.tv/images/nnt/103/0/bgy1.jpg"

    const dispatch = useDispatch();
    const moviesByImdb = useSelector(selectMovies);
    const loading = useSelector(selectLoading);
    console.log(moviesByImdb)
    //
    const getMovieListByImdb = async () => {
        dispatch(getMoviesByImdb());
    };
    useEffect(() => {
        getMovieListByImdb();
        console.log("moviesByImdb:", moviesByImdb);

    }, []);
    //



    // xu ly animation bang gsap
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
                  className="slider m-0 p-0"
              >
                  {loading?(
                    <div>...</div>
                  ):(
                      moviesByImdb && moviesByImdb.movies.map((movie) => (
                          <SwiperSlide className="slide slick-bg s-bg-1" key={movie.id} >
                              <Container fluid className="position-relative h-100" >
                                  <div className="slider-inner h-100">
                                      <Row className="align-items-center  iq-ltr-direction h-100 ">
                                          <Col xl="6" lg="12" md="12">
                                              <Link to="#">
                                                  <div className="channel-logo" data-iq-delay="0.5">
                                                      <img src={logo} className="c-logo" alt="streamit"/>
                                                  </div>
                                              </Link>
                                              <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">{movie.name}</h1>
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
                                                      <span className="text-white ml-2">{movie.imdb}</span>
                                                  </div>
                                                  <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                                      <span className="badge badge-secondary p-2">18+</span>
                                                      <span className="ml-3">2 Seasons</span>
                                                  </div>
                                                  <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">{ movie.description}
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
                      ))
                  )}




              </Swiper>
          </section>
          <div className="main-content">
              <section id="iq-favorites">
                  <Container fluid>
                      <Row>
                          <Col sm="12" className="overflow-hidden">
                              <div className="d-flex align-items-center justify-content-between">
                                  <h4 className="main-title">Latest Movies</h4>
                                  <Link className="iq-view-all" to="/movie-category">View All</Link>
                              </div>
                              <div id="favorites-contens">
                                  <div id="prev" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                  <div id="next" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                  <Swiper
                                      navigation={{
                                          prevEl: '#prev',
                                          nextEl: '#next'
                                      }}
                                      breakpoints={{
                                          320: { slidesPerView: 1 },
                                          550: { slidesPerView: 2 },
                                          991: { slidesPerView: 3 },
                                          1400: { slidesPerView: 4 }
                                      }}
                                      loop={true}
                                      slidesPerView={4}
                                      spaceBetween={20}
                                      as="ul"
                                      className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction">

                                      <SwiperSlide as="li">
                                          <div className=" block-images position-relative">
                                              <div className="img-box">
                                                  <img src={testimg} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Sand Dust</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">13+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                      <li><span><i className="ri-add-line"></i></span></li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={testimg} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Last Race</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">7+</div>
                                                      <span className="text-white">2 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button"><i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={testimg} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Boop Bitty</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">15+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={testimg} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Dino Land</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">18+</div>
                                                      <span className="text-white">3 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={testimg} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Jaction action</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">10+</div>
                                                      <span className="text-white">1 Season</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
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
                              <div className="d-flex align-items-center justify-content-between mt-3">
                                  <h4 className="main-title">Upcoming Movies</h4>
                                  <Link className="iq-view-all" to="/movie-category">View All</Link>
                              </div>
                              <div id="upcoming-contens">
                                  <div id="prev1" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                  <div id="next1" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                  <Swiper
                                      breakpoints={{
                                          320: { slidesPerView: 1 },
                                          550: { slidesPerView: 2 },
                                          991: { slidesPerView: 3 },
                                          1400: { slidesPerView: 4 },
                                      }}
                                      navigation={{
                                          prevEl: '#prev1',
                                          nextEl: '#next1'
                                      }}
                                      loop={true}
                                      slidesPerView={4}
                                      spaceBetween={20}
                                      as="ul"
                                      className="favorites-slider list-inline row p-0 m-0 iq-rtl-direction">
                                      <SwiperSlide as="li">
                                          <div className=" block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">The Last Breath</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">5+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button"><i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Shadow</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">22+</div>
                                                      <span className="text-white">2h 15m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"> <Link to="/show-details">Another Danger</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">25+</div>
                                                      <span className="text-white">3h</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">1980</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">11+</div>
                                                      <span className="text-white">2h 45m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Vugotronic</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">9+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                  </Swiper>
                              </div>
                          </Col>
                      </Row>
                  </Container>
              </section>
              <section id="iq-suggestede" className="s-margin">
                  <Container fluid>
                      <Row>
                          <Col sm="12" className="overflow-hidden">
                              <div className="d-flex align-items-center justify-content-between">
                                  <h4 className="main-title">Suggested For You</h4>
                                  <Link className="iq-view-all" to="/movie-category">View All</Link>
                              </div>
                              <div id="suggestede-contens">
                                  <div id="prev2" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                  <div id="prev2" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                  <Swiper
                                      slidesPerView={4}
                                      spaceBetween={20}
                                      navigation={{
                                          prevEl: '#prev2',
                                          nextEl: '#next2'
                                      }}
                                      breakpoints={{
                                          320: { slidesPerView: 1 },
                                          550: { slidesPerView: 2 },
                                          991: { slidesPerView: 3 },
                                          1400: { slidesPerView: 4 },
                                      }}
                                      loop={true}
                                      as="ul"
                                      className="list-inline favorites-slider row p-0 m-0 iq-rtl-direction">
                                      <SwiperSlide as="li">
                                          <div className=" block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Inside the Sea</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">11+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
                                                          <div className="share-box">
                                                              <div className="d-flex align-items-center">
                                                                  <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                                  <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                                  <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
                                                              </div>
                                                          </div>
                                                      </li>
                                                      <li><span><i className="ri-heart-fill"></i></span>
                                                          <span className="count-box">19+</span></li>
                                                      <li><span><i className="ri-add-line"></i></span></li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Jumbo Queen</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">9+</div>
                                                      <span className="text-white">2 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Unknown Land</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">17+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button"><i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now</Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Friends</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">14+</div>
                                                      <span className="text-white">10 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Blood Block</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">13+</div>
                                                      <span className="text-white">2h 40m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                  </Swiper>
                              </div>
                          </Col>
                      </Row>
                  </Container>
              </section>
              <section id="iq-trending" className="s-margin">
                  <Container fluid>
                      <Row>
                          <Col sm="12" className="overflow-hidden">
                              <div className="d-flex align-items-center justify-content-between">
                                  <h4 className="main-title">Trending</h4>
                                  <Link className="iq-view-all" to="/movie-category">View All</Link>
                              </div>
                              <div id="suggestede-contens">
                                  <div id="prev2" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                  <div id="prev2" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                  <Swiper
                                      slidesPerView={4}
                                      spaceBetween={20}
                                      navigation={{
                                          prevEl: '#prev2',
                                          nextEl: '#next2'
                                      }}
                                      breakpoints={{
                                          320: { slidesPerView: 1 },
                                          550: { slidesPerView: 2 },
                                          991: { slidesPerView: 3 },
                                          1400: { slidesPerView: 4 },
                                      }}
                                      loop={true}
                                      as="ul"
                                      className="list-inline favorites-slider row p-0 m-0 iq-rtl-direction">
                                      <SwiperSlide as="li">
                                          <div className=" block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Inside the Sea</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">11+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
                                                          <div className="share-box">
                                                              <div className="d-flex align-items-center">
                                                                  <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                                  <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                                  <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
                                                              </div>
                                                          </div>
                                                      </li>
                                                      <li><span><i className="ri-heart-fill"></i></span>
                                                          <span className="count-box">19+</span></li>
                                                      <li><span><i className="ri-add-line"></i></span></li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li">
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Jumbo Queen</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">9+</div>
                                                      <span className="text-white">2 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Unknown Land</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">17+</div>
                                                      <span className="text-white">2h 30m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button"><i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now</Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Friends</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">14+</div>
                                                      <span className="text-white">10 Seasons</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                      <SwiperSlide as="li" >
                                          <div className="block-images position-relative">
                                              <div className="img-box">
                                                  <img src={upcoming} className="img-fluid" alt=""/>
                                              </div>
                                              <div className="block-description">
                                                  <h6 className="iq-title"><Link to="/show-details">Blood Block</Link></h6>
                                                  <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                      <div className="badge badge-secondary p-1 mr-2">13+</div>
                                                      <span className="text-white">2h 40m</span>
                                                  </div>
                                                  <div className="hover-buttons">
                                                      <Link to="/show-details" role="button" className="btn btn-hover iq-button">
                                                          <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                          Play Now
                                                      </Link>
                                                  </div>
                                              </div>
                                              <div className="block-social-info">
                                                  <ul className="list-inline p-0 m-0 music-play-lists">
                                                      <li className="share">
                                                          <span><i className="ri-share-fill"></i></span>
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
                                                          <span><i className="ri-add-line"></i></span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </SwiperSlide>
                                  </Swiper>
                              </div>
                          </Col>
                      </Row>
                  </Container>
              </section>

          </div>

      </>
  )
}
export default HomePage