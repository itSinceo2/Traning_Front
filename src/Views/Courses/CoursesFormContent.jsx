import { useParams } from "react-router"
import { getCourseDetail, updateCourse } from "../../Services/CoursesService";
import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import CourseContent from "./CourseContent";
import CourseHeader from "../../Components/CourseHeader/CourseHeader";


const CoursesFormContent = () => {

    const { id } = useParams()

    const [course, setCourse] = useState({
        name: "",
        description: "",
        mainImage: null,
        content: [],
    });

    const [contentList, setContentList] = useState(course.content ? course.content : [])


    useEffect(() => {
        getCourseDetail(id)
            .then((data) => {
                setCourse(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
        , []);

    const addContent = () => {
        const content = {
            title: "",
            description: "",
            image: null
        }
        setContentList([...contentList, content])

    }


    const handleContentChange = (event, content, i) => {
        course.content[i] = event.target.value
        const newContentList = [...contentList]
        setContentList(newContentList)
        setCourse({
            ...course,
            content: newContentList
        })
        console.log(course)

    }


    const updatingCourse = () => {
        updateCourse(id, course)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    if (!course.mainImage) {
        return <div>Loading...</div>;
    }
    else {
       

        return (
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <CourseHeader
                        title={course.name}
                        description={course.description}
                        image={course.mainImage}
                    />
                </Box >
                <Divider orientation='horizontal' flexItem />
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>
                    {course.content?.map((content, index) => (
                        <Box key={index} sx={{ marginBottom: 3 }}>
                            <Typography variant="h5" sx={{ marginBottom: 1 }}>{content.title}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>{content.description}</Typography>
                            <img src={content.image} alt={content.title} />
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                        {
                            contentList.map((content, index) => (
                                <CourseContent
                                    key={course.content.length + index}
                                    content={content}
                                    i={index}
                                    onChange={handleContentChange}
                                    updatingCourse={updatingCourse}
                                />
                            ))
                        }
                    </Box>
                    <Button onClick={(e) => addContent(e)} variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar Sección</Button>
                </Box>
            </Box>
        )
    }
}

export default CoursesFormContent