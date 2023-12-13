import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import tvshowApi from "../../api/tvshow/exportMovieApi";
import logo from "../../assets/ui/images/logo.png"
import ImageSwiper from "./../../components/imageSwiper";
import ImageList from "../imageList";

function TvSeriesDetail() {
      let navigate = useNavigate();
      let { name } = useParams();
      const [tvseries, setTvSeries] = useState({});

      const [moreImage, setMoreImage] = useState([]);

      useEffect(() => {
          findByName();
      }, []);
      const findByName = async () => {
          const data = await tvshowApi.findByName(name);
          setTvSeries(data?.data);
          if (data?.data !== null && data?.data.moreImage !== null)
            setMoreImage(data?.data.moreImage.split("|"));
      };
      const redirectToWathchingTvSeriesPage = (id) => {
          navigate(`/watch-tvshow/${id}`)
      }
      const [toggler3, setToggler3] = useState(false);
      return (
          <div>
              <Container fluid className="position-relative h-100">
                  <div className="slider-inner h-100" >
                      <Row className="align-items-center  h-100 iq-ltr-direction" style={{ marginTop: 150 }}>
                          <Col xl="6" lg="12" md="12">
                              <Link to="#">
                                  <div className="channel-logo">
                                      <img src={logo} className="c-logo" alt="streamit" />
                                  </div>
                              </Link>
                              <h1 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">{tvseries?.name}</h1>
                              <div className="d-flex flex-wrap align-items-center">
                                  <div className="slider-ratting d-flex align-items-cent`er mr-4 mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
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
                                      <span className="text-white ml-2">{tvseries?.imdb}(lmdb)</span>
                                  </div>
                              </div>
                              <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">{tvseries?.description}
                              </p>
                              <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                  <div className="text-primary title starring">
                                      Starring: <span className="text-body">Karen Gilchrist, James Earl Jones</span>
                                  </div>
                                  <div className="text-primary title genres">
                                      Genres:
                                      {tvseries?.categoryList?.map((category, index) => (
                                          <div key={index}>
                                              <span className="text-body" >{category?.name}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                              <div className="d-flex align-items-center r-mb-23" data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                  <Link role="button" className="btn btn-hover" onClick={(e) => {
                                      e.preventDefault();
                                      redirectToWathchingTvSeriesPage(tvseries?.id)
                                  }}>
                                      <i className="fa fa-play mr-1" aria-hidden="true"></i>
                                      Play Now
                                  </Link>
                              </div>
                          </Col>
                          <Col xl="5" lg="12" md="12" className="trailor-video  text-center">
                              <Link onClick={() => setToggler3(!toggler3)} to="/" className="video-open playbtn">
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
                          </Col>
                      </Row>
                  </div>
              </Container>
              {moreImage && moreImage.length > 4 ? <ImageSwiper images={moreImage} /> : <ImageList images={moreImage} />}
          </div>
      )
}

export default TvSeriesDetail