import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieHistoryList() {
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
        // Logic to delete movie from history
        console.log("Delete movie with ID:", movieId);
        // Update the state to remove the deleted movie
        setMovieHistoryList(currentList => currentList.filter(movie => movie.id !== movieId));
    };

    const handleContinueWatching = (movieId) => {
        // Logic to continue watching
        console.log("Continue watching movie with ID:", movieId);
        // Add any navigation logic if needed
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Movie History</h2>
            <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto', fontSize: '18px' }}>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Duration (hours)</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {movieHistoryList.map((movie, index) => (
                    <tr key={index}>
                        <td><img src={movie.movieImg} alt={movie.movieName} style={{ width: '50px', height: 'auto' }} /></td>
                        <td>{movie.movieName}</td>
                        {/*<td>{movie.duration}</td>*/}
                        <td>
                            <button onClick={() => handleContinueWatching(movie.id)}>Continue Watching</button>
                            <button onClick={() => handleDelete(movie.id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieHistoryList;