import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const CourseCard = ({ course, handleDeleteCourse, action, route }) => {


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={course.mainImage} title={course.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={route}>{action}</Button>
        <Button href={`/course/content/${course.id}`}>
          <EditIcon />
        </Button>
        <Button onClick={() => handleDeleteCourse(course.id)}>

          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
