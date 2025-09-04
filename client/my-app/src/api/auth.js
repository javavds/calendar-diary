import http from './http';
export const login = (body) => http.post('/auth/login', body); // {email,password}
export const register = (body) => http.post('/auth/register', body); // {name,email,password}
