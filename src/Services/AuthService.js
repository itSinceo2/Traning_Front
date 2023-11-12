import createHttp from './BaseService';

const http = createHttp();

export const register = (user) => http.post('/users/register', user);
export const loginMail = (user) => http.post('/users/login', user);
