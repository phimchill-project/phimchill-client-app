import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTvSeriesByImdb, getTvSeriesByFavorites, getTvSeriesByNewest, selectImdb, selectFavorites, selectNewest, selectLoading, selectError } from '../../features/tvSeries/tvSeriesSlice';
import { Link } from 'react-router-dom'
import {Dropdown, Button, Container} from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import MainContent from "./MainContent";
// import TvSeries from "./TvSeries";
SwiperCore.use([Navigation]);



const ShowTvseries = () => {
    const dispatch = useDispatch();
    const imdbList = useSelector(selectImdb);
    const favoritesList = useSelector(selectFavorites);
    const newestList = useSelector(selectNewest);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);


    useEffect(() => {
        dispatch(getTvSeriesByImdb());
        dispatch(getTvSeriesByFavorites());
        dispatch(getTvSeriesByNewest());
    }, []);


    return(
        <>
            <section id="tvshow" className="iq-main-slider p-0">

                <div id="prev" className="swiper-button swiper-button-prev"><i className= "ri-arrow-left-s-line"></i></div>
                <div id="next" className="swiper-button swiper-button-next"><i className= "ri-arrow-right-s-line"></i></div>
                <div style={{ height: '470px', overflow: 'hidden' , marginTop : 20}}>
                    <Swiper
                        slidesPerView={2}

                        navigation={{
                            prevEl: '#prev',
                            nextEl: '#next'
                        }}
                        loop={true}
                        centeredSlides={true}
                        id="tvshows-slider"
                        className="iq-rtl-direction">
                        { imdbList &&  imdbList.listTVSeries.map((tvSerires, index) => (
                            <SwiperSlide key={index}>
                                <div className="shows-img" style={{ height: '100%',width:'100%', objectFit: 'cover' }}>
                                    <img src={tvSerires.image} className="w-100 img-fluid" alt="" style={{ height: '450px', overflow: 'hidden' }}/>
                                    <div className="shows-content">
                                        <h4 className="text-white mb-1">{tvSerires.name}</h4>
                                        <div className="movie-time d-flex align-items-center">
                                            <div className="badge badge-secondary p-1 mr-2">18+</div>
                                            <span className="text-white">2 Seasons</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </section>
            <div className="main-content">
                {favoritesList && (
                    <MainContent TvSeriesResponse={favoritesList} />
                )}
                {newestList && (
                    <MainContent TvSeriesResponse={newestList} />
                )}
            </div>
        </>
    )
}
export default ShowTvseries;