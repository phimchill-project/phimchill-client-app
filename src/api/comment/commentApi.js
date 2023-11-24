import axios from "axios";

const API = "http://localhost:8080/api/"

export const getAllCommentsByMovieId = async (id) => {
      let result = null;
      try{
            result = await axios.get(`${API}movies/${id}/comments`);
      }catch (e) {
            return null;
      }
      return result?.data;
}