import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  List,
  Typography,
} from "@mui/material";

const Exam = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [exam, setExam] = useState({});

  useEffect(() => {
    getCourseDetail(id)
      .then((response) => {
        setCourse(response);
        setExam(response.Exam);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(course);
  console.log(exam.questions);

  if (!course || !exam) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src={course.mainImage}
          />
          <Typography variant="h4" gutterBottom component="div">
            {course.name}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            {exam.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
                {exam.questions?.map((question) => {
                    const labelId = `checkbox-list-secondary-label-${question._id}`;
                    return (
                        <Box key={question._id} sx={{display:'flex', flexDirection:'column', justifyContent:'start', alignItems:'start'}} >
                            <Typography variant='h5'>{question.question}</Typography>
                            {question.options.map((option) => (
                                <Box key={option._id} sx={{display:'flex', justifyContent:'start', alignItems:'center', gap:1, margin:1, width:'100vh'}}>
                                    <Checkbox
                                        edge="end"
                                        checked={false}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    <Typography variant='h6'>{option.option}</Typography>
                                </Box>
                            ))}
                        </Box>
                    );
                })}




            </List>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Exam;
