import axios from "axios";

const API_URL = "https://reqres.in/api/";

class AuthService {
    login(email, password) {
        return axios
        .post(API_URL + "login", {
            email,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

            return response.data.token;
        });
    }

    logout() {
        localStorage.removeItem("token");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'));;
    }
        
}

export default new AuthService();