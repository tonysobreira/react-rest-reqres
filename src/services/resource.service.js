import axios from 'axios';

const API_URL = "https://reqres.in/api/";

class ResourceService {

    getResources(page) {
        return axios.get(API_URL + 'unknown/?page=' + page);
    }

    getResourceById(resourceId) {
        return axios.get(API_URL + 'unknown/' + resourceId)
            .then (response => {
                return response.data;
            });
    }

}

export default new ResourceService();