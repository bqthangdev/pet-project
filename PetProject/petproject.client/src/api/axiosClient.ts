import axios from 'axios';
import commonConfig from 'config/common';

//Default config for Axios
const axiosClient = axios.create({
    baseURL: commonConfig.API_URL,
    headers: {
        "content-type": commonConfig.API_CONTENT_TYPE,
    },
});

export default axiosClient;