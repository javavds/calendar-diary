import http from './http';
export const getNow = () => http.get('/weather/now');
export const getByDate = (date) => http.get('/weather/by-date', { params: { date } });
