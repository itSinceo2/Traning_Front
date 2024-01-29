import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextFormatToShowInCard from '../TextFormat/TextFormatToShowInCard';


const CourseCard = ({ course, handleDeleteCourse, action, route }) => {


  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia sx={{ height: 140 }} image={course?.mainImage ? course?.mainImage : 'https://res.cloudinary.com/dv7hswrot/image/upload/v1606988059/avatar/avatar_cugq40.png' } title={course.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>


          <TextFormatToShowInCard htmlContent={course.description}/>

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
