import { Box, Button, TextField, Typography, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createCourse } from "../../Services/CoursesService";
import CourseContent from "./CourseContent";
import { useTheme } from "@mui/system";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CoursesForm = () => {
    const [course, setCourse] = useState({
        name: "",
        description: "",
        mainImage: null,
        content: [],
    });
    const theme = useTheme();
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setCourse({
            ...course,
            mainImage: event.target.files,
        });
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        console.log(name, value);

        if (name.substring(0, 7) === "content") {
            const contentProperty = name.substring(11, name.length)
            console.log(contentProperty);


            const contentArray = [...course.content];
            contentArray[index] = {
                ...contentArray[index],
                [contentProperty]: value,
            };
            setCourse({
                ...course,
                content: contentArray,
            });
        } else {
            setCourse({
                ...course,
                [name]: value,
            });
        }
    };


    const handleSubmit = (event) => {
        console.log(course);
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("description", course.description);

        // Asegúrate de agregar correctamente mainImage al formData
        formData.append("mainImage", course.mainImage);

        // Convert content array to JSON and append to formData
        formData.append("content", JSON.stringify(course.content));

        createCourse(formData)
            .then(() => {
                navigate("/courses");
            })
            .catch((error) => console.log(error));
    };


    const addContent = () => {
        setCourse({
            ...course,
            content: [
                ...course.content,
                { title: "", description: "", image: "" }
            ],
        });
    };


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "80vh" }} encType="multipart/form-data">
            <Box sx={{ margin: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h3">Courses Form</Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                    <TextField
                        name="name"
                        onChange={handleInputChange}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                    />
                    <TextareaAutosize
                        minRows={3}
                        maxRows={10}
                        name="description"
                        onChange={handleInputChange}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                    />
                    <Button
                        component="label"
                        variant="contained"
                        sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.main }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Imagen de portada
                        <VisuallyHiddenInput
                            onChange={(e) => handleFileChange({
                                target: {
                                    files: e.target.files,
                                },
                            })}
                            name="content.image"
                            type="file"
                            multiple />
                    </Button>

                    {course.content.map((content, index) => (
                        <CourseContent
                            key={index}
                            index={index}
                            contentName={content}
                            handleInputChange={(e) => handleInputChange(e, index)}
                            CloudUploadIcon={CloudUploadIcon}
                            VisuallyHiddenInput={VisuallyHiddenInput}
                            handleFileChange={(e) => handleFileChange(e, index)}
                            theme={theme}
                        />
                    ))}


                    <Button variant="contained" color="success" onClick={addContent}>
                        Agregar Contenido
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        CREAR
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default CoursesForm;
