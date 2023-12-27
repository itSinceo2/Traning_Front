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
        console.log(contentList)
        const content = {
            title: contentList.title,
            description: contentList.description,
            image: contentList.image,
        }
        setCourse({
            ...course,
            content: [...course.content, content]
        })
        updateCourse(id, { content: contentList })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleAddContent = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setContentList({
            ...contentList,
            [name]: value,
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
                                <CourseContent
                                    key={course.content.length}
                                    onChange={handleAddContent}
                                />
                    </Box>
                    <Button onClick={(e) => addContent(e)} variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar Sección</Button>
                </Box>
            </Box>
        )
    }
}

export default CoursesFormContent