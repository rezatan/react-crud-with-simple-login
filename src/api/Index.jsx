//import axios
import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
};

const Api = axios.create({
    //set default endpoint API
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: getToken()
    }
})

export default Api