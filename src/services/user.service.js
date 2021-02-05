import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://springboot-securityjwt-backend.herokuapp.com/api/test/';
const API_URL = "https://reqres.in/api/";

class UserService {
    getPublicContent() {
        //return axios.get(API_URL + 'all');
        return "Public Content...";
    }

    getUserBoard() {
        //return axios.get(API_URL + 'user', { headers: authHeader() });
        return "User Content...";
    }

    getUsers(page) {
        return axios.get(API_URL + 'users/?page=' + page);
    }

    getUser() {
        return axios.get(API_URL + "users/4")
            .then (response => {
                return response.data;
            });
    }

    getUserById(userId) {
        return axios.get(API_URL + "users/" + userId)
            .then (response => {
                return response.data;
            });
    }

    deleteUserById(userId) {
        return axios.delete(API_URL + "users/" + userId)
            .then (response => {
                return response;
            });
    }

    updateUser(user) {
        let id = user.id;
        let name = user.name;
        let job = user.job;

        return axios
            .put(API_URL + "users/" + id, {
                name,
                job
            })
            .then(response => {
                return response;
            });
    }

}

export default new UserService();