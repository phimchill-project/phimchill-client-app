import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
function MainContent({ TvSeriesResponse }) {
    const navigate = useNavigate();
    const redirectToDetailTvSeriesPage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/tvseries-detail/${newName}`)
    }
    return (

        TvSeriesResponse &&
        <div style={{ height: '300px', overflow: 'hidden' }}>
            <Container fluid>
                <Row>
                    <Col sm="12" className="overflow-hidden">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="main-title">{TvSeriesResponse.title}</h4>
                        </div>
                        <div id="favorites-contens">

                            <Swiper
                                slidesPerView={4} spaceBetween={20}
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
                                {TvSeriesResponse.listTVSeries?.map((element, index) => (
                                    <div key={index}>
                                        <SwiperSlide className="slide-item">
                                            <div className="block-images1 block-images position-relative">
                                                <div className="img-box" style={{ height: '215px', width: '370px' }}>
                                                    <img src={element.image} className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={element.name} />
                                                </div>
                                                <div className="block-description">
                                                    <h6 className="iq-title">{element.name}</h6>
                                                    <div className="movie-time d-flex align-items-center my-2">
                                                        <div className="badge badge-secondary p-1 mr-2">15+</div>
                                                        <span className="text-white">2 Seasons</span>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link to={`/watch-tvshow/${element.name}/1`} role="button" className="btn btn-hover">
                                                            <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                            Play Now
                                                        </Link>
                                                    </div>
                                                    <div className="hover-buttons">
                                                        <Link role="button" className="btn btn-hover"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                redirectToDetailTvSeriesPage(element?.name)
                                                            }}>
                                                            <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                                            More details
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