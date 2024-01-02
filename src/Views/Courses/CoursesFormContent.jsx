import { useNavigate, useParams } from "react-router"
import { getCourseDetail, updateCourse, updateCourseContent, updateCourseImage } from "../../Services/CoursesService";
import { useEffect, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import CourseContent from "./CourseContent";
import CourseHeader from "../../Components/CourseHeader/CourseHeader";
import EditableTag from "../../Components/EditableTag/EditableTag";


const CoursesFormContent = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        name: "",
        description: "",
        mainImage: null,
        content: [],
    });

    const [contentList, setContentList] = useState(course.content ? course.content : [])


    useEffect(() => {
        console.log("Effect triggered after course update");
      
        // Coloca la llamada a getCourseDetail dentro de una función asincrónica
        const fetchData = async () => {
          try {
            const data = await getCourseDetail(id);
            setCourse(data);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData(); // Llama a la función fetchData directamente
      
      }, [id]);
      

      const addContent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", contentList.title);
        formData.append("description", contentList.description);
        formData.append("image", contentList.image instanceof File ? contentList.image : undefined);
    
        try {
            const data = await updateCourseContent(id, formData, { headers: { "Content-Type": "multipart/form-data" } });
            setCourse((prevCourse) => ({ ...prevCourse, content: data.content || [] }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddContent = (event) => {
        const { name, value, files } = event.target;

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

    const editImage = (files, index) => {
          
        const newContent = [...course.content];
        if (newContent[index]) {
            const name = "image";
            newContent[index][name] = files[0];

            const contentId = newContent[index]._id;

            setCourse({
                ...course,
                content: newContent
            });

            const formData = new FormData();
            formData.append("image", files[0] instanceof File ? files[0] : undefined);
            formData.append("contentId", contentId);           

            updateCourseImage(id, formData, { headers: { "Content-Type": "multipart/form-data" }})
                .then((res) => {
                    setCourse(res)
                    navigate(`/course/content/${id}`); 
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.error(`newContent[${index}] is undefined`);
        }
    };



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
                                    initialValue={content.title ? content.title : ""}
                                    onUpdate={editTag}
                                />
                                <EditableTag
                                    index={index}
                                    name="description"
                                    sx={{ marginBottom: 1 }}
                                    typeOfTag={"body1"}
                                    initialValue={content.description ? content.description : ""}
                                    onUpdate={editTag}
                                />
                                <EditableTag
                                    index={index}
                                    name="image"
                                    sx={{ marginBottom: 1 }}
                                    typeOfTag={"img"}
                                    initialValue={content.image ? content.image : ""}
                                    editImage={(e) => editImage(e, index)}

                                />
                            </Box>
                        ))}
                    
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'center' }}>

                    <form action="submit" encType="multipart/form-data" >
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