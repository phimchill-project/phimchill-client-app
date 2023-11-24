import axios from "axios";

const API = "http://localhost:8080/api/"

export const getAllCategory = async () => {
      let result = null;
      try {
          result = await axios.get(`${API}category`);    
      }
      catch (e) {
          console.log("Find Check Email Exist API error: " + e);
          console.log(result);
          return null;
      }
      return result?.data.data;
} 