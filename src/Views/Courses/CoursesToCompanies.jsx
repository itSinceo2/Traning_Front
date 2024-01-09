import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCourseDetail } from '../../Services/CoursesService';
import { getClientsList } from '../../Services/ClientsService';



const CoursesToCompanies = () => {

    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCourseDetail(id)
            .then((data) => {
                setCourse(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id])

    useEffect(() => {
        getClientsList()
            .then((data) => {
                setCompanies(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    , [])

    console.log(companies);

    const columns = [
        { field: 'nif', headerName: 'NIF', width: 120 },
        { field: 'name', headerName: 'Nombre', width: 250 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];
    
    const rows = [...companies
    ];


    return (
        <Box>
            <Typography variant="h3" sx={{ marginBottom: 3 }}>Empresas asignadas al curso</Typography>
            <List>
                <ListItem>
                <ListItemAvatar>
                    <Avatar src={course.mainImage}/>
                </ListItemAvatar>
                <ListItemText primary={course.name}/>
                </ListItem>

            </List>
            
            <Box sx={{ margin: 2 }}>
            <DataTable 
            rows={rows}
            columns={columns}
            />
            </Box>
        </Box>
    )
}

export default CoursesToCompanies






function DataTable({ rows, columns}) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
