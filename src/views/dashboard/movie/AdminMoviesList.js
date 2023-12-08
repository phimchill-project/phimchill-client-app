import React, { useEffect, useState } from "react";
import  movieApi from "../../../api/movie/exportMovieApi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './../../../assets/ui/css/style.css'

function AdminMoviesList() {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoviesList(currentPage);
    }, [currentPage]);

    const fetchMoviesList = async (page) => {
        try {
            let response = await movieApi.findAllMovies(page);
            setMovieList(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {

        }
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await movieApi.deleteMovie(movieId);
            setMovieList(movieList.filter(movie => movie.id !== movieId));
        } catch (error) {
            // Xử lý lỗi tại đây
            console.error("Error deleting movie: " + error);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    console.log(movieList)
    const renderPagination = () => {
        return (
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        disabled={index === currentPage}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };

    const redirectToUpdateMoviePage = (name) => {
        let newName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g,"-").replace(":","");
        console.log(newName)
        navigate(`/admin/movies/update/${newName}`)
    }
    return (
        <div style={{marginLeft : 200, marginRight : 200}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <table id="movie">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>YEAR</th>
                    <th>DURATION</th>
                    <th>IMDB</th>
                    <th>VIEWS</th>
                    <th>CATEGORY</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {movieList ?.map((movies, index) => (
                    <tr key={index}>
                        <td>{movies?.id}</td>
                        <td>{movies?.name}</td>
                        <td style={{width : "50"}}>{movies?.description}</td>
                        <td>{movies?.year}</td>
                        <td>{movies?.duration}</td>
                        <td>{movies?.imdb}</td>
                        <td>{movies?.views}</td>
                        <td>{movies?.categoryList.map((category, index) => (
                            <div key={index}>
                                <span >{category?.name} </span>
                                <br />
                            </div>
                        ))}</td>
                        <td>
                            <div className="hover-buttons">
                                <Link role="button" className="btn  btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    redirectToUpdateMoviePage(movies?.name)
                                }}>
                                    <i className=" mr-1" aria-hidden="true"></i>
                                    Update
                                </Link>
                            </div>
                            <br />
                            <div className="hover-buttons">
                                <Link role="button" className="btn btn-hover" onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteMovie(movies.id);
                                }}>
                                    <i className=" mr-1" aria-hidden="true"></i>
                                    Delete
                                </Link>
                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
}

export default AdminMoviesList;
