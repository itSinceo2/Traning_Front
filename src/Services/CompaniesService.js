import createHttp from './BaseService';

const http = createHttp(true);

export const registerCompany = (company) => http.post('/companies/create', company);
export const getCompaniesList = () => http.get('/');
export const getCompanyDetail = (id) => http.get(`/${id}`);
export const deleteCompany = (id) => http.delete(`/${id}`);
export const updateCompany = (id, company) => http.put(`/${id}`, company);



