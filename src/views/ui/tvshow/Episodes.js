import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";
import React from "react";

function Episodes({ episodes }){

    return (
        <>
            {episodes.map((episode, index) => (
                <Col key={index} md="6" className="col-1-5 iq-mb-30">
                    <div className="epi-box">
                        <div className="epi-img position-relative">
                            <img src="https://firebasestorage.googleapis.com/v0/b/phim-chill.appspot.com/o/images-movie%2Fthor.jpg14b28519-2bb8-4c59-bc45-2202663e7d6c?alt=media&token=1fef74e3-11e7-40f4-a062-3dedf3f0aaac" className="img-fluid img-zoom" alt=""/>
                            <div className="episode-play-info">
                                <div className="episode-play">
                                    <Link to="#">
                                        <i className="ri-play-fill"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="epi-desc p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="text-white"></span>
                                <span className="text-primary"></span>
                            </div>
                            <Link to={episode.link}>
                                <h6 className="epi-name text-white mb-0">{episode.name}</h6>
                            </Link>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    )
}

export default Episodes;