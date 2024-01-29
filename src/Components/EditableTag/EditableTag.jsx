import { Box, Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextFormat from '../TextFormat/TextFormat';





const EditableTag = ({ typeOfTag, initialValue, onUpdate, name, index, editImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    onUpdate(e, index);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleImageChange = (e) => {
    e.preventDefault()
    const files = e.target.files;
    editImage(files, index);
    setIsEditing(false);
  };


  let inputComponent;

  switch (name) {
    case "title":
      inputComponent = (
        <form action='submit'>
          <TextField
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        </form>
      );
      break;
    case "description":
      inputComponent = (
        <form action='submit'>
          <TextFormat
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        </form>
      );
      break;
    case "image":
      inputComponent = (
        <form action="submit" encType="multipart/form-data">
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <input type='file' id='file' onChange={handleImageChange} style={{ display: 'none' }} />
            <label htmlFor='file'>
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                type='submit'
              >
                Upload
              </Button>
            </label>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>{value.name}</Typography>
          </Box>
        </form>
      );
      break;

    default:
      inputComponent = (
        <form action='submit'>
          <TextField
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        </form>
      );
  }

  return (
    <Box onDoubleClick={handleDoubleClick} >
      {isEditing ? inputComponent : (
        name === 'image' || name === 'avatar'
          ?
          <div style={{ maxWidth: '80%',  margin: '0 auto', textAlign: 'center' }}>
            <img
              src={value}
              alt={value}
              style={{ maxWidth: '100%',  height: 'auto', border: '1px solid black' }}
            />
          </div>
          :
          <div style={{ maxWidth: '80%', minWidth:'70vh', margin: '0 auto', textAlign: 'center' }}>
          <Typography variant={typeOfTag} onDoubleClick={handleDoubleClick}>
            {value}
          </Typography>
          </div>
          
      )}
    </Box>
  );
};

export default EditableTag;
