import http from './http';
export const getDiary = (date) => http.get(`/diary/${date}`); // GET /diary/YYYY-MM-DD
export const saveDiary = (date, body) => http.post(`/diary/${date}`, body); // POST {title,content}
