import axios from 'axios';

const baseURL = import.meta?.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5555'; // 백엔드 포트 5555

const http = axios.create({ baseURL });

// 요청 인터셉터: 토큰 자동 첨부
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default http;
