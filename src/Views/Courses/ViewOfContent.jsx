import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import CourseTest from '../../Components/CourseTest/CourseTest';

const ViewOfContent = ({ content, test }) => {
    const [page, setPage] = useState(1);
    const [contentArray, setContentArray] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newArray = [];
                content.forEach((contentItem) => {
                    const matchingTest = test.find((testItem) => contentItem.title === testItem.title);
                    if (matchingTest) {
                        newArray.push(contentItem)
                        newArray.push(matchingTest);
                    } else {
                        newArray.push(contentItem);
                    }
                });
                setContentArray(newArray);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [content, test]);

    const handleToggle = (questionId, optionId) => () => {
        setSelectedOptions((prevSelected) => ({
            ...prevSelected,
            [questionId]: optionId,
        }));
    };

    if (!contentArray || contentArray.length === 0) {
        return (
            <div>
                <h1>No hay contenido o está cargando</h1>
                <p>Si el problema persiste contacte con su administrador</p>
            </div>
        );
    } else {
        return (
            <Stack spacing={2}>
                <Box>
                    {contentArray[page - 1].questions ? (
                        <CourseTest
                            contentArray={contentArray}
                            page={page}
                            handleToggle={handleToggle}
                            selectedOptions={selectedOptions}
                        />
                    ) : (
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginY: 2 }}>
                            <Typography>{contentArray[page - 1].title}</Typography>
                            <img src={contentArray[page - 1].image} alt={contentArray[page - 1].name} />
                            <Typography>{contentArray[page - 1].description}</Typography>
                        </Card>
                    )}
                </Box>
                <Pagination count={contentArray.length} page={page} onChange={handleChange} />
            </Stack>
        );
    }
}

export default ViewOfContent;
