import { Box, Button, Grid, Typography } from "@mui/material";
import CourseCard from "../../Components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import { getCoursesList } from "../../Services/CoursesService";
import Search from "../../Components/Search/Search";

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);

    useEffect(() => {
        getCoursesList()
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = (filteredOptions) => {
        setFilterCourses(filteredOptions);
    };

    const coursesToRender = filterCourses.length ? filterCourses : courses;

    return (
        !coursesToRender ?
            <Box>Loading...</Box>
            :
            <Box sx={{ margin: 2 }}>
                <Typography variant="h3" sx={{ marginBottom: 3 }}>Cursos</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Search
                        options={courses}
                        searchLabel="Buscar curso"
                        labelProp="name"
                        onSearch={handleSearch}
                    />
                    <Button href="/course/new" variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar</Button>
                </Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        coursesToRender.map((course) => (
                            <Grid key={course.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <CourseCard course={course} />
                            </Grid>
                        ))
                    }
                </Grid>

            </Box>
    );
}

export default Courses;