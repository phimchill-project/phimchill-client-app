import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import tvshowApi from "../../../api/tvshow/exportMovieApi";
import Loading from "../../../components/common/Loading";
import Episodes from "./Episodes";
import routes from "../../../router/routes-path";
import ReactPlayer from 'react-player';

const WatchTvSeries = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    const [seasonNumber, setSeasonNumber] = useState("");
    const [episodeNumber, setEpisodeNumber] = useState("");
    const [episode, setEpisode] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tvShow, setTvShow] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user?.member){
            navigate("/error401");
        }
        findById();
    }, [ id ]);

    const findById = async () => {
        const data = await tvshowApi.findById(id);
        if (data.statusCode === 404){
            navigate(routes.error404);
        }else if (data.statusCode === 200){
            // let parts = season_episode.split('-');

            // setSeasonNumber(parts[1]);
            // setEpisodeNumber(parts[3]);

            // const episodesWithLink = data.data.seasonList[parts[1] - 1].episodeList.map((episode, index) => ({
            //     ...episode,
            //     link: `/watch-tvshow/${name}/season-${parts[1]}-episode-${index + 1}`
            // }));

            // setEpisode(episodesWithLink.splice(parts[3] - 1, 1))

            // setEpisodes(episodesWithLink);

            // setIsLoading(false);
        }
        setTvShow(data);
    };

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <div>
                    <Container >
                        <div className="video-container  d-flex justify-content-center" style={{ width: "100%", height: "60%", marginTop: -80 }}>
                            <div>
                                <ReactPlayer
                                    id='movie'
                                    // ref={playerRef}
                                    url={""}
                                    width="100%"
                                    height="100%"
                                    playing
                                    controls={true}
                                    className="video d-block"
                                    style={{ marginTop: -10 }}
                                    // onStart={onReady}
                                    // onProgress={handleProgress}
                                />
                            </div>

                        </div>
                    </Container>
                    <div className="main-content">
                        <section className="movie-detail container-fluid">
                            <Row>
                                <Col lg="12">
                                    <div className="trending-info season-info g-border">
                                        <h4 className="trending-text big-title text-uppercase mt-0">{tvShow.data.name}</h4>
                                        <div className="d-flex align-items-center text-white text-detail episode-name mb-0">
                                            <span>S{seasonNumber}E{episodeNumber}</span>
                                        </div>
                                        <p className="trending-dec w-100 mb-0">{tvShow.data.description}</p>
                                        <ul className="list-inline p-0 mt-4 share-icons music-play-lists">
                                            <li>
                                                <span><i className="ri-add-line"></i></span>
                                            </li>
                                            <li>
                                                <span><i className="ri-heart-fill"></i></span>
                                            </li>
                                            <li className="share">
                                                <span><i className="ri-share-fill"></i></span>
                                                <div className="share-box">
                                                    <div className="d-flex align-items-center">
                                                        <Link to="#" className="share-ico"><i className="ri-facebook-fill"></i></Link>
                                                        <Link to="#" className="share-ico"><i className="ri-twitter-fill"></i></Link>
                                                        <Link to="#" className="share-ico"><i className="ri-links-fill"></i></Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        <section id="iq-favorites">
                            <Container fluid>
                                <div className="block-space">
                                    <Row>
                                        <Col sm="12" className="overflow-hidden">
                                            <div className="iq-main-header d-flex align-items-center justify-content-between">
                                                <h4 className="main-title">Latest Episodes</h4>
                                                <Link to="#" className="text-primary">View all</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Episodes episodes={episodes} />
                                    </Row>
                                </div>
                            </Container>
                        </section>
                    </div>
                </div>
            )}
        </>

    )
}
export default WatchTvSeries;