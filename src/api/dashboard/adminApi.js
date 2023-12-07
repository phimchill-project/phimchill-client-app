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

export const fetchNewTvSeries = async (newFilm) => {
    let result = null;
    try {
        result = await axios.post(`${ADMIN_API}tvSeries/new`,newFilm, {
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