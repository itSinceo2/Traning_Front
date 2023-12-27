import { Button, FormGroup, TextareaAutosize } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";




const EditableTag = ({ typeOfTag, initialValue, onUpdate, name, index }) => {
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

  let inputComponent;

  switch (name) {
    case "title":
      inputComponent = (
        <TextField
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      );
      break;
    case "description":
      inputComponent = (
        <TextareaAutosize
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      );
      break;
      case "image":
        inputComponent = (
          <FormGroup sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} encType="multipart/form-data" >
          <input type='file' id='file' style={{ display: 'none' }} />
          <label htmlFor='file'>
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>{value}</Typography>
            <Button variant="contained" color="primary" onClick={handleBlur}>Save</Button>
            </FormGroup>
        );
        break;
    default:
      inputComponent = (
        <TextField
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      );
  }

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? inputComponent : (
        name === 'image' ? <img src={value} alt={value} /> :
        <Typography variant={typeOfTag} onDoubleClick={handleDoubleClick}>
          {value}
        </Typography>
      )}
    </div>
  );
};

export default EditableTag;
