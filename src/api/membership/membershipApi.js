import axios from "axios";

const API = "http://localhost:8080/api/payment/"

export const createPayemnt = async () => {
      let token = localStorage.getItem("token");
      let payment = {
            amount: 100000,
            bankCode: "NCB"
      }
      let result = null;
      try {
            result = await axios.post(`${API}create`,
                  payment,
                  {
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                              Authorization: "Bearer " + token
                        }
                  })
      } catch (e) {
            console.log(e);
            alert("Cannot Create Payment. Please Do Again");
            return;
      }
      window.location.replace(result?.data.data)
}