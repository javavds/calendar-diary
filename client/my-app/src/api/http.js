import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5555',
});

// 요청 인터셉터: 토큰 부착
http.interceptors.request.use((cfg) => {
    const t = localStorage.getItem('token');
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
});

// 응답 인터셉터: 401 처리
http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

export default http;
