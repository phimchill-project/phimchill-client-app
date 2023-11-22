import React from 'react'
import { Link } from 'react-router-dom'
import {Dropdown, Button, Container} from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import  { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import MainContent from "./MainContent";
import Banner from "./Banner";
// import TvSeries from "./TvSeries";
SwiperCore.use([Navigation]);
//test

const banners = [
    { img: "https://nguoinoitieng.tv/images/nnt/103/0/bgy1.jpg", name: "Banner 1", listSeason: [1, 2, 3] },
    { img: "https://cdn.vnreview.vn/655360_141218525099175_2048995752935424?wt=0711beb18a36553bd3e80945af3b88c2&rt=339b11efc5381072ef36e88cd2be01ca", name: "Banner 2", listSeason: [4, 5, 6] },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PYIywH9GIq1LHa7EdnSIL602P4rd7CQd3buoPkuSNA&s", name: "Banner 3", listSeason: [1, 2, 3] },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PYIywH9GIq1LHa7EdnSIL602P4rd7CQd3buoPkuSNA&s", name: "Banner 4", listSeason: [1, 2, 3] }
    ]
const tvList = {title: "Phim Pho Bien",
list: [
    { img: "https://nguoinoitieng.tv/images/nnt/103/0/bgy1.jpg", name: "Banner 1", listSeason: [1, 2, 3] },
    { img: "https://cdn.vnreview.vn/655360_141218525099175_2048995752935424?wt=0711beb18a36553bd3e80945af3b88c2&rt=339b11efc5381072ef36e88cd2be01ca", name: "Banner 2", listSeason: [4, 5, 6] },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PYIywH9GIq1LHa7EdnSIL602P4rd7CQd3buoPkuSNA&s", name: "Banner 3", listSeason: [1, 2, 3] },
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PYIywH9GIq1LHa7EdnSIL602P4rd7CQd3buoPkuSNA&s", name: "Banner 4", listSeason: [1, 2, 3] }
]}
//
const ShowTvseries = () => {
    return(
        <>
            <section id="tvshow" className="iq-main-slider p-0">
                <div id="prev" className="swiper-button swiper-button-prev"><i className= "ri-arrow-left-s-line"></i></div>
                <div id="next" className="swiper-button swiper-button-next"><i className= "ri-arrow-right-s-line"></i></div>
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
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <div className="shows-img">
                                <img src={banner.img} className="w-100 img-fluid" alt=""/>
                                <div className="shows-content">
                                    <h4 className="text-white mb-1">{banner.name}</h4>
                                    <div className="movie-time d-flex align-items-center">
                                        <div className="badge badge-secondary p-1 mr-2">18+</div>
                                        <span className="text-white">{banner.listSeason.length} Seasons</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Dropdown className="genres-box">
                    <Dropdown.Toggle as={Button} variant="secondary" className="">
                        Genres
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="three-column">
                        <Dropdown.Item href="#">Hindi</Dropdown.Item>
                        <Dropdown.Item href="#">Tamil</Dropdown.Item>
                        <Dropdown.Item href="#">Punjabi</Dropdown.Item>
                        <Dropdown.Item href="#">English</Dropdown.Item>
                        <Dropdown.Item href="#">Comedies</Dropdown.Item>
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Romance</Dropdown.Item>
                        <Dropdown.Item href="#">Dramas</Dropdown.Item>
                        <Dropdown.Item href="#">Bollywood</Dropdown.Item>
                        <Dropdown.Item href="#">Hollywood</Dropdown.Item>
                        <Dropdown.Item href="#">Children & Family</Dropdown.Item>
                        <Dropdown.Item href="#">Award-Winning</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </section>
            <div className="main-content">
                    <MainContent TvSeriesList={tvList}/>
                    <MainContent TvSeriesList={tvList}/>
                    <MainContent TvSeriesList={tvList}/>
                    <MainContent TvSeriesList={tvList}/>
            </div>
        </>
    )
}
export default ShowTvseries;