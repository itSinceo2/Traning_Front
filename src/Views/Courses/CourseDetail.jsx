import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import { Box, Divider, Typography } from "@mui/material";

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
    
    return (
        <Box className="container" sx={{marginTop:4}}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>{course.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>{course.description}</Typography>
        <Divider orientation='horizontal' flexItem />

        <Typography variant="body" sx={{ marginBottom: 3 }}>Contenido</Typography>
        
        
        {
            course.content?.map((content, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>{content.title}</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>{content.description}</Typography>
                    <img src={content.image} alt={content.title} />
                </Box>
            ))
        }
        </Box>
    );
    }

export default CourseDetail;