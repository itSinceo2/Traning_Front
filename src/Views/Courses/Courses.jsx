import { Box } from "@mui/material";
import CourseCard from "../../Components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import { getCoursesList } from "../../Services/CoursesService";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCoursesList()
        .then((data) => {
            setCourses(data);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    return (
        <Box>
            {
                courses.map((course) => {
                    return <CourseCard course={course} key={course.id}/>
                })
            }

                
        </Box>
    );
    }

export default Courses;