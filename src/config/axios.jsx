import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 300000,
}); //create axios instance

axiosInstance.interceptors.request.use(config => {

    var token = localStorage.getItem('accessToken');
    if (token!=null && token!=undefined && token != '') {
        config.headers['Authorization'] = "Bearer " + token;
    }

    config.headers['X-Request-Id'] = "00000000-0000-0000-00000000000000000";
    var xrequestid = localStorage.getItem('xrequestid');
    if (xrequestid!==null && xrequestid!==undefined && xrequestid!=="") {
        config.headers['X-Request-Id'] = xrequestid;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors here
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export const axiosUpload = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 300000,
}); //create axios instance

axiosUpload.interceptors.request.use(config => {

    config.headers['Content-Type'] = "multipart/form-data";

    var token = localStorage.getItem('accessToken');
    if (token!=null && token!=undefined && token!='') {
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        config.headers['Authorization'] = "Bearer " + token;
    }

    config.headers['X-Request-Id'] = "00000000-0000-0000-00000000000000000";

    var xrequestid = localStorage.getItem('xrequestid');
    if (xrequestid!==null && xrequestid!==undefined && xrequestid!=="") {
        config.headers['X-Request-Id'] = xrequestid;
    }

    return config;
});

export default axiosInstance;