import { useState } from 'react';
import { Box, Button, TextField} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextFormat from '../../Components/TextFormat/TextFormat';

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

const CourseContent = ({ onChange }) => {

  const [file, setFile] = useState(null);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onChange(event);
  };

  console.log(file);

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <TextField
        name='title'
        onChange={(event) => onChange(event)}
        id="outlined-basic"
        label="Titulo de seccion"
        variant="outlined"
        sx={{ width: '100%' }}
      />
      <TextFormat
        name='description'
        onChange={(event) => onChange(event)}
        id="outlined-basic"
        label="Descripcion de seccion"
        variant="outlined"
        sx={{ width: '100%' }}
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Imagen de seccion
        <VisuallyHiddenInput
          onChange={(event) => handleFileChange(event)}
          name='image'
          type="file"
          multiple
        />
      </Button>
      <br />
      {/* Puedes mostrar el nombre del archivo seleccionado si es necesario */}
      {file && <p>Selected File: {file.name}</p>}
    </Box>
  );
}

export default CourseContent;
