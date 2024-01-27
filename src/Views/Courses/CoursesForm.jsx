import { Box, Button, TextField, Typography} from "@mui/material";
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

    const handleFileChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.files[0],
        });
    };

    const handleEditorChange = (content) => {
        console.log('entraaaaa');
        setCourse({
            ...course,
            description: content,
        });
    };

    const handleInputChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("description", course.description);
        formData.append("mainImage", course.mainImage);

        createCourse(formData)
            .then((response) => {
                console.log(response)
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
                        handleChange ={handleEditorChange}
                        initialValue='<h3>Reemplace este texto por la descripción del curso</h3>'
                    />

                    <Button
                        component="label"
                        variant="contained"
                        sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.main }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Imagen de portada
                        <VisuallyHiddenInput
                            onChange={(e) => handleFileChange(e, {
                                target: {
                                    files: e.target.files,
                                },
                            })}
                            type="file"
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
