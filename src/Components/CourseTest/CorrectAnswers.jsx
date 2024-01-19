import { Box, Card, Typography } from "@mui/material";


const CorrectAnswers = ({ questions }) => {

    const correctAnswersArr = (questions) => {
        const correctAnswers = [];
        questions.forEach((question) => {
          const correctOptions = question.options.filter((option) => option.isCorrect === true);
          correctAnswers.push({
            question: question.question,
            correctAnswer: correctOptions[0].option,
          });
        });
        return correctAnswers;
      };


    if (!questions) return (<h1>Loading...</h1>)
    else {
        return (
            <Card>
                
                    {correctAnswersArr(questions).map((question,i) => (
                       <Box key={i} sx={{margin:2}}>
                        <Typography variant='h6'><b>{question.question}</b></Typography>
                        <Typography variant='body'>{question.correctAnswer}</Typography>
                        </Box>
                    ))}

            </Card>
        );
    }
};

export default CorrectAnswers;
