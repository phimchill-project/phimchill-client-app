import React from 'react'
import { Link } from 'react-router-dom'
function TvSeries(tvSeries) {
    return(
        <div>
            <div className="block-images1 block-images position-relative">
                <div className="img-box">
                    <img src={tvSeries.img} className="img-fluid" alt=""/>
                </div>
                <div className="block-description">
                    <h6 className="iq-title"><Link to="/movie-details">{tvSeries.name}</Link></h6>
                    <div className="movie-time d-flex align-items-center my-2">
                        <div className="badge badge-secondary p-1 mr-2">15+</div>
                        <span className="text-white">{tvSeries.listSeason.length} Seasons</span>
                    </div>
                    <div className="hover-buttons">
                        <Link to="/movie-details" role="button" className="btn btn-hover"><i className="fa fa-play mr-1" aria-hidden="true"></i>
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
        </div>
    )
}
export default TvSeries;