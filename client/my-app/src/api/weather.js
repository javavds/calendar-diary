import http from './http';

// 좌표 필수
export const getNow = ({ lat, lon }) => http.get('/weather/now', { params: { lat, lon } });

// 좌표 필수 (안전장치로 기본값은 두지 않음)
export const getByDate = (date, { lat, lon }) => http.get('/weather/by-date', { params: { date, lat, lon } });
