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
        name: '',
        description: '',
        mainImage: '',
        content: [],
    });
    const [content, setContent] = useState([]);
    const theme = useTheme();

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setCourse({
            ...course,
            mainImage: event.target.files[0],
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'content') {
            // Handle content array separately
            const contentArray = [...content];
            contentArray[contentArray.length - 1][name] = value;
            setContent(contentArray);
        } else {
            setCourse({
                ...course,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("description", course.description);
        formData.append("mainImage", course.mainImage);

        // Convert content array to JSON and append to formData
        formData.append("content", JSON.stringify(content));

        createCourse(formData)
            .then(() => {
                navigate("/courses");
            })
            .catch((error) => console.log(error));
    };

    const addContent = () => {
        setContent([...content, { title: '', description: '', image: '' }]);
    };

    return (
        <form onSubmit={handleSubmit} style={{maxWidth:"80vh"}} encType="multipart/form-data">
            <Box sx={{ margin: 2 }}>
                <Typography variant="h3">Courses Form</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        name="name"
                        onChange={handleInputChange}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                    />
                    <TextField
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
                            onChange={handleFileChange}
                            name="mainImage"
                            type="file"
                        />
                    </Button>

                    {
                        content.map((content, index) => (
                            <CourseContent
                                key={index}
                                content={content}
                                handleInputChange={(e) => handleInputChange({
                                    target: {
                                        name: 'content',
                                        value: e.target.value,
                                    },
                                })}
                                CloudUploadIcon={CloudUploadIcon}
                                VisuallyHiddenInput={VisuallyHiddenInput}
                                handleFileChange={handleFileChange}
                                theme={theme}
                            />
                        ))
                    }

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
