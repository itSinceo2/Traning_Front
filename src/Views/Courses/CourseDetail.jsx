import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import { Box, Divider, Typography } from "@mui/material";
import ViewOfContent from "./ViewOfContent";

const CourseDetail = () => {
    const { id } = useParams();

    const [course, setCourse] = useState({});

    

    useEffect(() => {
        getCourseDetail(id)
            .then((data) => {
                setCourse(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    if (!course) return <h1>El curso no existe</h1>
    else {

        return (
            <Box className="container" sx={{ marginTop: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>{course.name}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>{course.description}</Typography>
                <Divider orientation='horizontal' flexItem />


                <ViewOfContent content={course.content} test={course.tests} courseId={id} />

            </Box>
        );
    }
}

export default CourseDetail;