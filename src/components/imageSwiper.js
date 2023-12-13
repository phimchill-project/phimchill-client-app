import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";

function ImageSwiper({ images }){
    const [list, setList] = useState();

    useEffect(() => {
        setList(images);
    }, [images]);

    return (
        <>
            {list != null && list.length > 0 ?
                <section className="mt-5">
                    <Container fluid>
                        <Row>
                            <Col sm="12" className="overflow-hidden">
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <h4 className="main-title">More Image</h4>
                                    <Link className="iq-view-all" to="/movie-category">View All</Link>
                                </div>
                                <div id="favorites-contens">
                                    <div id={"prev"} className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                                    <div id={"next"} className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                                    <Swiper
                                        navigation={{
                                            prevEl: `#prev`,
                                            nextEl: `#next`
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
                                        {list?.map((image, index) => (
                                            <SwiperSlide as="li" key={index}>
                                                <div className=" block-images position-relative">
                                                    <div className="img-box">
                                                        <img src={image} className="img-fluid" alt=""/>
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

export default ImageSwiper;
