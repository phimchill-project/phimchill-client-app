import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function MovieHistoryList() {
    const navigate = useNavigate();
    const [movieHistoryList, setMovieHistoryList] = useState([]);

    useEffect(() => {
        fetchMovieHistoryList();
    }, []);

    const fetchMovieHistoryList = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get("http://localhost:8080/api/movies/history/watched-movies", {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setMovieHistoryList(response.data.data);
            } else {
                console.error("Expected an array in the response, but received:", response.data);
            }
        } catch (e) {
            console.error("Error fetching movie history list:", e);
        }
    };
    const handleDelete = async (movieId) => {
        console.log("Delete movie with ID:", movieId);
        setMovieHistoryList(currentList => currentList.filter(movie => movie.id !== movieId));
    };

    const handleContinueWatching = (name) => {
        let newName = name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(":","").replace(" ","-");
        navigate(`/watch-movie/${newName}`)
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Movie History</h2>
            <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto', fontSize: '18px' }}>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    {/*<th>Duration (minites)</th>*/}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {movieHistoryList.map((movie, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{movie.movieName}</td>
                        {/*<td>{movie.duration}</td>*/}
                        <td>
                            <button onClick={() => handleContinueWatching(movie?.name)}>Continue Watching</button>
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieHistoryList;