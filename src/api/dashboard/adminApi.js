import axios from "axios";

const ADMIN_API = "http://localhost:8080/api/admin/";

export const fetchCreateNewMoive = async (newMovie) => {
      try {
          await axios.post(`${ADMIN_API}movie/new`,newMovie, {
              headers: {
                  Accept: 'application/json',
                  "Content-Type": 'application/json',
              },
          });
          return true;
      } catch (e) {
          console.log("Create Movie API error: " + e);
          return false;
      }
}
<<<<<<< HEAD
export const fetchUpdateMovie = async (movieId, updatedMovie) => {
    try {
        const response = await axios.put(`${ADMIN_API}movie/update/${movieId}`, updatedMovie, {
=======

export const fetchNewTvSeries = async (newFilm) => {
    let result = null;
    try {
        result = await axios.post(`${ADMIN_API}tvSeries`,newFilm, {
>>>>>>> 687a795232bdf880cade65b0a58f36616cb3cd61
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
<<<<<<< HEAD
        return response.data; // hoặc response.data.success tùy thuộc vào cấu trúc phản hồi của API
    } catch (e) {
        console.log("Update Movie API error: " + e);
        return false;
    }
}
=======
    } catch (e) {
        console.log("Create Movie API error: " + e);
    }
    return result?.data;
}

export const fetchUpdateTvSeries = async (newFilm) => {
    let result = null;
    try {
        result = await axios.put(`${ADMIN_API}tvSeries`,newFilm, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
    } catch (e) {
        console.log("Create Movie API error: " + e);
    }
    return result?.data;
}
>>>>>>> 687a795232bdf880cade65b0a58f36616cb3cd61
