
import { TextareaAutosize } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

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

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        typeOfTag.includes('h') ? (
          <TextField
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, name)}
            autoFocus
            fullWidth
            variant="standard"
          />
        ) : (
          <TextareaAutosize
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            fullWidth
            variant="standard"
          />
        )
      ) : (
        <Typography variant={typeOfTag} onDoubleClick={handleDoubleClick}>
          {value}
        </Typography>
      )}
    </div>
  );
};

export default EditableTag;
