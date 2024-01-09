
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

const CourseStatus = ({courses}) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {courses.map((course) => (
            <ListItem key={course._id}>
            <ListItemAvatar>
                <Avatar sx={{ width: 50, height: 50 }} src={course.course.mainImage ? course.course.mainImage : WorkIcon}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={course.course.name} secondary={course.status} />
            </ListItem>
        ))}
    </List>
  );
}

export default CourseStatus;
