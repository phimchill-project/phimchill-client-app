import React from "react";
import {  Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import  { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
function MainContent({TvSeriesList}) {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm="12" className="overflow-hidden">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="main-title">{TvSeriesList.title}</h4>
                        </div>
                        <div id="favorites-contens">
                            <div id="prev1" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                            <div id="next1" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={20}
                                navigation={{
                                    prevEl: '#prev1',
                                    nextEl: '#next1'
                                }}
                                loop={true}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    550: { slidesPerView: 2 },
                                    991: { slidesPerView: 3 },
                                    1400: { slidesPerView: 4 },
                                }}
                                className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction">


                                {TvSeriesList.list.map((element, index) => (
                                    <div key={index}>
                                        <SwiperSlide className="slide-item">
                                            <div className="block-images1 block-images position-relative">
                                                <div className="img-box">
                                                    <img src={element.img} className="img-fluid" alt=""/>
                                                </div>
                                                <div className="block-description">
                                                    <h6 className="iq-title">{element.name}</h6>
                                                    <div className="movie-time d-flex align-items-center my-2">
                                                        <div className="badge badge-secondary p-1 mr-2">15+</div>
                                                        <span className="text-white">2 Seasons</span>
                                                    </div>
                                                    <div className="hover-buttons">

                                                            Play Now

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
                                    </div>
                                ))}
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default MainContent;