import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import fav1 from "../assets/images/favorite/01.jpg";
function FilmSwiper({ flims, name }){
    const [list, setList] = useState();

    useEffect(() => {
        setList(flims);
    }, [flims]);

    return (
        <>
            {list != null && list.length > 0 ?
                <section className="mt-5">
                    <Container fluid>
                        <Row>
                            <Col sm="12" className="overflow-hidden">
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <h4 className="main-title">{name}</h4>
                                    <Link className="iq-view-all" to="/movie-category">View All</Link>
                                </div>
                                <div id="favorites-contens">
                                    <div id={"prev" + name} className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                    <div id={"next" + name} className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                    <Swiper
                                        navigation={{
                                            prevEl: `#prev${name}`,
                                            nextEl: `#next${name}`
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
                                        {list?.map((flim, index) => (
                                            <SwiperSlide as="li" key={index}>
                                                <div className=" block-images position-relative">
                                                    <div className="img-box">
                                                        <img src={fav1} className="img-fluid" alt=""/>
                                                    </div>
                                                    <div className="block-description">
                                                        <h6 className="iq-title"><Link to="/show-details">{flim.name}</Link></h6>
                                                        <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                                            <div className="badge badge-secondary p-1 mr-2">13+</div>
                                                            <span className="text-white">{flim.duration} minutes</span>
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
                                        ))}
                                    </Swiper>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                : ""
            }
        </>
    )
}

export default FilmSwiper;