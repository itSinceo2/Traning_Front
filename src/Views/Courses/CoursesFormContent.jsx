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
        , [id]);

    console.log(contentList)

    const addContent = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("title", contentList.title);
        formData.append("description", contentList.description);
        formData.append("image", contentList.image instanceof File ? contentList.image : undefined);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        updateCourseContent(id, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((data) => {
                console.log(data)
                setCourse(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

const handleAddContent = (event) => {
    const { name, value, files } = event.target;

    console.log("Name:", name);
    console.log("Value:", value);
    console.log("Files:", files);

    name === "image" ?
    setContentList({
        ...contentList,
        [name]: files[0],
    }) :
    setContentList({
        ...contentList,
        [name]: value,
    });
};

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
                                index={index}
                                name="description"
                                sx={{ marginBottom: 1 }}
                                typeOfTag={"body1"}
                                initialValue={content.description}
                                onUpdate={editTag}
                            />
                            <EditableTag
                                index={index}
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

                    <form action="submit"  encType="multipart/form-data" >
                        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                            <CourseContent
                                key={course.content.length}
                                onChange={handleAddContent}
                            />
                        </Box>
                        <Button type="submit" onClick={(e) => addContent(e)} variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar Sección</Button>
                    </form>
                </Box>
            </Box>
        )
    }
}

export default CoursesFormContent