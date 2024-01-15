import { Box, Button, Card, Checkbox, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const CourseTest = ({
    contentArray,
    page,
    handleToggle,
    selectedOptions,
    handleTestSubmit,
    
}) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginY: 2 }}>
            <Typography>{contentArray[page - 1].title}</Typography>
            <form>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {contentArray[page - 1].questions.map((question) => {
                        const labelId = `checkbox-list-secondary-label-${question._id}`;
                        return (
                            <Box key={question._id}>
                                <Typography variant='h5'>{question.question}</Typography>
                                {question.options.map((option) => (
                                    <Box key={option._id}>
                                        <ListItem
                                            key={option._id}
                                            secondaryAction={
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(question._id, option._id)}
                                                    checked={(selectedOptions[question._id] || []).indexOf(option._id) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(question._id, option._id)} dense>
                                                <ListItemText id={option._id} primary={`${option.option}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Box>
                                ))}
                            </Box>
                        );
                    })}
                </List>
                <Button variant="contained" color="primary" type="submit" sx={{ marginBottom: 2 }} onClick={handleTestSubmit}>Enviar</Button>
            </form>

        </Card>
    )
}

export default CourseTest;