import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import { Box, Divider, Typography } from "@mui/material";
import ViewOfContent from "./ViewOfContent";
import { useAuthContext } from "../../Contexts/AuthContext";
import { updateDedication } from "../../Services/UsersService";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const { user } = useAuthContext();
    const [viewTime, setViewTime] = useState(0);

    // Primer useEffect para obtener detalles del curso
    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const data = await getCourseDetail(id);
                setCourse(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCourseDetail();
    }, [id]);
    useEffect(() => {
        let timer;

        const handleViewTime = () => {
            setViewTime((prev) => prev + 1);
        };

        timer = setInterval(handleViewTime, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [id]);


    useEffect(() => {
        if (viewTime !== 0 && viewTime % 10 === 0) {
            const updatedDedication = {
                courseId: id,
                dedication:user.courses.find((course) => course.course.id === id)?.dedication +  viewTime,
            };


            updateDedication(user.id, updatedDedication)
                .then(() => {
                    console.log("updating the course");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [viewTime, id, user]);


    if (!course) return <h1>El curso no existe</h1>;
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
