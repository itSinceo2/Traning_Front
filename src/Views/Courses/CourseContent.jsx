import { Box, Button, TextField, TextareaAutosize } from "@mui/material";


const CourseContent = ({ handleInputChange, CloudUploadIcon, VisuallyHiddenInput, handleFileChange, theme }) => {
    return (
        <Box sx={{width:'100%'}}>
            <TextField
                name="content.title"
                onChange={handleInputChange}
                id="outlined-basic"
                label="Content"
                variant="outlined"
                sx={{width:'100%'}}
            />
            <TextareaAutosize
                minRows={3}
                maxRows={10}
                aria-label="Textarea"
                placeholder="Descripción del curso"
                style={{ width: "100%" }}
            />
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{width:'100%',  color: theme.palette.primary.main, backgroundColor: theme.palette.secondary.main}}
            >
                Imagen de seccion
                <VisuallyHiddenInput
                    onChange={handleFileChange}
                    name="mainImage"
                    type="file"
                />
            </Button>
            <br />
        </Box>
    );
}

export default CourseContent;
