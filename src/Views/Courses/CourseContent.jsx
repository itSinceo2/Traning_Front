import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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


const CourseContent = ({  onChange }) => {
    return (
        <Box sx={{ width: '100%', marginTop:2 }}>
            <TextField
                name='title'
                onChange={(event) => onChange(event)}
                id="outlined-basic"
                label="Titulo de seccion"
                variant="outlined"
                sx={{ width: '100%' }}
            />
            <TextareaAutosize
                minRows={3}
                maxRows={10}
                name='description'
                onChange={(event) => onChange(event)}
                id="outlined-basic"
                label="Descripción"
                variant="outlined"
                aria-label="Textarea"
                placeholder="Descripción de la seccion"
                style={{ width: "100%", fontFamily: "Roboto" }}
            />
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Imagen de seccion
                <VisuallyHiddenInput
                    onChange={(event) => onChange(event)}
                    name='image'
                    type="file"
                    multiple
                />
            </Button>
            <br />
        </Box>
    );
}

export default CourseContent;
