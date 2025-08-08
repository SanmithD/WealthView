import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://wealthview.onrender.com/api/portfolio',
    withCredentials: true
});