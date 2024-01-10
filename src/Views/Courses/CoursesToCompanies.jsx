import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../Services/CoursesService";
import { getClientsList } from "../../Services/ClientsService";
import AsignCourseTable from "../../Components/AsignCourseTable/AsignCourseTable";


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

    const columns = ["Seleccionar", "Nombre", "Email", "Telefono"];
    const properties = [ "name", "email", "phone"];


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
                    <AsignCourseTable
                    rows={companies}
                    columns={columns}
                    properties={properties}

                    ></AsignCourseTable>
                </Box>
            </Box>
        );
};

export default CoursesToCompanies;
