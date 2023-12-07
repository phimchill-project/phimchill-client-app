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
export const fetchUpdateMovie = async (movieId, updatedMovie) => {
    try {
        const response = await axios.put(`${ADMIN_API}movie/update/${movieId}`, updatedMovie, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
        return response.data; // hoặc response.data.success tùy thuộc vào cấu trúc phản hồi của API
    } catch (e) {
        console.log("Update Movie API error: " + e);
        return false;
    }
}
