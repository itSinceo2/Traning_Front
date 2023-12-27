import { useParams } from "react-router"
import { getCourseDetail, updateCourse, updateCourseContent } from "../../Services/CoursesService";
import { useEffect, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import CourseContent from "./CourseContent";
import CourseHeader from "../../Components/CourseHeader/CourseHeader";
import EditableTag from "../../Components/EditableTag/EditableTag";



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
    
        
        updateCourseContent(id, contentList)
            .then((data) => {
                setCourse(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleAddContent = (event) => {
        const { name, value } = event.target;
        setContentList({
            ...contentList,
            [name]: value,
        });
    }

    const editTag = (e, index) => {

        const { name, value } = e.target;
        const newContent = [...course.content];
        newContent[index][name] = value;
        setCourse({
            ...course,
            content: newContent
        })
        updateCourse(id, { content: newContent })
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
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    {course.content?.map((content, index) => (
                        <Box key={index} sx={{ marginBottom: 3 }}>
                            <EditableTag 
                                index={index}
                                name="title"
                                sx={{ marginBottom: 1 }}
                                typeOfTag={"h5"}
                                initialValue={content.title}
                                onUpdate={editTag}
                            />
                            <EditableTag 
                                name="description"
                                sx={{ marginBottom: 1 }}
                                typeOfTag={"body1"}
                                initialValue={content.description}
                                onUpdate={editTag}
                            />
                            <EditableTag
                                name="image"
                                sx={{ marginBottom: 1 }}
                                typeOfTag={"img"}
                                initialValue={content.image}
                                onUpdate={editTag}
                            />
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>
                <form encType="multipart/form-data">
                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                                <CourseContent
                                    key={course.content.length}
                                    onChange={handleAddContent}
                                />
                    </Box>
                    <Button onClick={(e) => addContent(e)} variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar Sección</Button>
                    </form>
                </Box>
            </Box>
        )
    }
}

export default CoursesFormContent