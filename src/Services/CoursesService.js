import createHttp from "./BaseService";

const http = createHttp(true);

export const createCourse = (course) => http.post("/courses/create", course);
export const getCoursesList = () => http.get("/courses/");
export const getCourseDetail = (id) => http.get(`/courses/${id}`);
export const deleteCourse = (id) => http.delete(`/courses/${id}`);
export const updateCourse = (id, course) => http.put(`/courses/${id}`, course);