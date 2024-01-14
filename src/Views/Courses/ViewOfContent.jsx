
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Box, Card } from '@mui/material';

const ViewOfContent = ({ content, test }) => {


    console.log(test)
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };


    if (!content) {
        return (
            <div>
                <h1>No hay contenido o está cargando</h1>
                <p>Si el problema persiste contacte con su administrador</p>
            </div>
        )
    } else {

        return (
            <Stack spacing={2}>

                <Box>
                    <Card sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <Typography>{content[page - 1].title}</Typography>
                    <img src={content[page - 1].image} alt={content[page - 1].name} />
                    <Typography>{content[page - 1].description}</Typography>
                    </Card>
                </Box>
                <Pagination count={content.length} page={page} onChange={handleChange} />
            </Stack>
        );
    }
}

export default ViewOfContent;
