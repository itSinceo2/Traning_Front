import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCourseDetail } from "../../Services/CoursesService"
import { Avatar, Box, Divider, Typography } from "@mui/material"

const Exam = () => {

    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [exam, setExam] = useState({})

    useEffect(() => {
        getCourseDetail(id)
            .then((response) => {
                setCourse(response)
                setExam(response.Exam)
            }).catch((error) => {
                console.log(error);
            });
    }, [id])
    console.log(course);
    console.log(exam);

    if (!course || !exam) {
        return <h1>Loading...</h1>
    } else {
        return (
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={course.mainImage} />
                    <Typography variant="h4" gutterBottom component="div">{course.name}</Typography>
                </Box>
                <Divider />
                

            </Box>
        )
    }
}

export default Exam