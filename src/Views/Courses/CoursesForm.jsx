import { Box, Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createCourse } from "../../Services/CoursesService";
import { useTheme } from "@mui/system";
import TextFormat from "../../Components/TextFormat/TextFormat";


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

    const handleFileChange = (event, fieldName) => {
        setCourse({
            ...course,
            [fieldName]: event.target.files[0],
        });
    };

    const handleEditorChange = (content, name) => {

        name = 'description';
        setCourse({
            ...course,
            [name]: content,
        });
    };

    const handleInputChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value,
        });
    };

    console.log(course);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("description", course.description);
    
        // Verificar si course.mainImage no es nulo antes de agregarlo al FormData
        if (course.mainImage) {
            formData.append("mainImage", course.mainImage);
        }
    
        createCourse(formData)
            .then((response) => {
                navigate(`/course/content/${response.id}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "80vh" }} encType="multipart/form-data" multiple={true}>
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
                    <TextFormat
                        name="description"
                        handleChange={handleEditorChange}
                        initialValue='<p>Reemplace este texto por la descripción del curso</p>'
                    />

                    <Button
                        component="label"
                        variant="contained"
                        sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.main }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Imagen de portada
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => handleFileChange(e, "mainImage")}
                            multiple />
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
