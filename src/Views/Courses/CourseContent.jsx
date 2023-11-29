import { Box, Button, TextField, TextareaAutosize } from "@mui/material";


const CourseContent = ({ handleInputChange, CloudUploadIcon, VisuallyHiddenInput, handleFileChange, theme, index }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <TextField
                name={`content[${index}].title`}
                onChange={(e) => handleInputChange(e, index)}
                id="outlined-basic"
                label="Titulo"
                variant="outlined"
                sx={{ width: '100%' }}
            />
            <TextareaAutosize
                minRows={3}
                maxRows={10}
                name={`content[${index}].description`}
                onChange={(e) => handleInputChange(e, index)}
                id="outlined-basic"
                label="Descripción"
                variant="outlined"
                aria-label="Textarea"
                placeholder="Descripción del curso"
                style={{ width: "100%", fontFamily: "Roboto" }}
            />
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ width: '100%', color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.main }}
            >
                Imagen de seccion
                <VisuallyHiddenInput
                    onChange={(e) => handleFileChange({
                        target: {
                            files: e.target.files,
                        },
                    })}
                    name={`content[${index}].image`}
                    type="file"
                    multiple
                />
            </Button>
            <br />
        </Box>
    );
}

export default CourseContent;
