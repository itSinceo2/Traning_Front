import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCourseDetail } from '../../Services/CoursesService';
import { getClientsList } from '../../Services/ClientsService';

function DataTable({ rows, columns }) {


    const [selectionModel, setSelectionModel] = useState([]);

    const handleChange = (e) => {
        if(e.field === '__check__') {

        console.log(e.value);
        console.log(e.row);
        }
    }
    
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onCellClick={(e) => {
            handleChange(e);
        }
        }


      />
    </div>
  );
}

const CoursesToCompanies = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    getCourseDetail(id)
      .then((data) => {
        setCourse(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    getClientsList()
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: 'nif', headerName: 'NIF', width: 120 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];


  console.log(selectedCompanies);

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: 3 }}>
        Empresas asignadas al curso
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={course.mainImage} />
          </ListItemAvatar>
          <ListItemText primary={course.name} />
        </ListItem>
      </List>

      <Box sx={{ margin: 2 }}>
        <DataTable rows={companies} columns={columns} />
      </Box>
    </Box>
  );
};

export default CoursesToCompanies;
