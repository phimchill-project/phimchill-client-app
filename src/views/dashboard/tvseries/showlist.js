import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from '../../../components/Card';
import { findAllTVSeries,DeleteTVSeries,RestoreTVSeries } from '../../../api/tvSeriesApi/tvSeriesAPI';
import {format} from 'date-fns'
//img
import st08 from '../../../assets/dashboard/images/show-thumb/08.jpg';
import routes from "../../../router/routes-path";

const Showlist = () => {
    const [shows, setShows] = useState([]);

    const fecthAllShow = async () => {
        let result = await findAllTVSeries();
        if (result == null) {
            return;
        }
        const formattedShows = result.data.listTVSeries.map((show) => ({
            ...show,
            dateRelease: show.dateRelease ? format(new Date(show.dateRelease), 'dd/MM/yyyy') : null,
        }));

        setShows(formattedShows);
        console.log(shows)
    };
    useEffect(() => {
        setShows(null);
        fecthAllShow();
    }, []);
    const handleDelete = async (showId) => {
        try {
            await DeleteTVSeries(showId);
            fecthAllShow();
        } catch (error) {
            console.error('Error deleting show:', error);
        }
    };

    const handleRestore =async (showId) => {
        try {
            await RestoreTVSeries(showId);
            fecthAllShow();
        } catch (error) {
            console.error('Error Restore show:', error);
        }
    };

    function normalizeName(s) {
        let temp = s.normalize("NFD");
        let pattern = /[\u0300-\u036f]/g;
        return "/admin/update-tvSeries/" + temp.replace(pattern, "").replace(":", "").replace("-", " ").toLowerCase();
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <Card.Header.Title>
                                    <h4 className="card-title">Show Lists</h4>
                                </Card.Header.Title>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <Link to={routes.addTvSeries} className="btn btn-primary">
                                        Add Show
                                    </Link>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-view">
                                    <table className="data-tables table movie_table" style={{ width: '100%' }}>
                                        <thead>
                                        <tr>
                                            <th>Show</th>
                                            <th>Seasons</th>
                                            <th>Category</th>
                                            <th>Date Release</th>
                                            <th>Is Delete</th>
                                            <th style={{ width: '20%' }}>Description</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {shows?.map((show) => (
                                            <tr key={show.id}>
                                                <td>
                                                    <div className="media align-items-center">
                                                        <div className="iq-movie">
                                                            <Link to="#">
                                                                <img
                                                                    src={show.image}
                                                                    className="img-border-radius avatar-40 img-fluid"
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="media-body text-white text-left ml-3">
                                                            <p className="mb-0">{show.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{show.seasonList.length} Seasons</td>
                                                <td>{show.categoryList.map((category) => category.name).join(', ')}</td>
                                                <td>{show.dateRelease}</td>
                                                <td>{show.isDelete ? 'Deleted' : 'Active'}</td>
                                                <td>
                                                    <p>{show.description}</p>
                                                </td>
                                                <td>
                                                    <div className="flex align-items-center list-user-action">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip>View</Tooltip>}
                                                        >
                                                            <Link className="iq-bg-warning" to="#">
                                                                <i className="lar la-eye"></i>
                                                            </Link>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip>Edit</Tooltip>}
                                                        >
                                                            <Link className="iq-bg-success" to={normalizeName(show.name)}>
                                                                <i className="ri-pencil-line"></i>
                                                            </Link>
                                                        </OverlayTrigger>
                                                        {show.isDelete ? (
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Restore</Tooltip>}>
                                                                <Link
                                                                    className="iq-bg-primary"
                                                                    to="#"
                                                                    onClick={() => handleRestore(show.id)}
                                                                >
                                                                    <i className="ri-disc-fill"></i>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        ) : (
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                                                <Link
                                                                    className="iq-bg-primary"
                                                                    to="#"
                                                                    onClick={() => handleDelete(show.id)}
                                                                >
                                                                    <i className="ri-delete-bin-line"></i>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Showlist;
