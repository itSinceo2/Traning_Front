import createHttp from './BaseService';

const http = createHttp(true);

export const registerClient = (company) => http.post('/companies/create', company);
export const getClientsList = () => http.get('/companies/');
export const getClientDetail = (id) => http.get(`/companies/${id}`);
export const deleteClient = (id) => http.delete(`/companies/${id}`);
export const updateClient = (id, company) => http.put(`/companies/${id}`, company);



