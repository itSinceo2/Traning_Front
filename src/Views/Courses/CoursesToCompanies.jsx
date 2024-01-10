import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import { getClientsList } from "../../Services/ClientsService";


function DataTable({ rows, columns }) {
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);



  useEffect(() => {
    const selectedRows = rows.filter((row) => row.selection).map((row) => row.id);
    setSelectionModel(selectedRows);
  }, [rows]);

  const handleChange = (newSelection) => {
    setSelectionModel(newSelection.selectionModel);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selectionModel}
        onCellClick={(e) => {
          handleChange(e);
        }}
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
    { field: "nif", headerName: "NIF", width: 120 },
    { field: "name", headerName: "Nombre", width: 250 },
    { field: "email", headerName: "Email", width: 200 },
  ];

 

    companies.forEach((company) => {
        company.selection = false;
        if (company.courses) {
            company.courses.forEach((course) => {
            if (course.id === id) {
                company.selection = true;
            }
            });
        }
        });


  if (course === undefined) {
    return <div>loading...</div>;
  } else
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
