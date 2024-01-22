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
import { getClientsList, updateClient } from "../../Services/ClientsService";
import AsignCourseTable from "../../Components/AsignCourseTable/AsignCourseTable";


const CoursesToCompanies = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);


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


    const handleChange = (event, row) => {
        if (event.target.checked) {
            row.courses = [...row.courses, course];
        } else {
            row.courses = row.courses.filter(
                (c) => c.id !== course.id
            );
        }
        setCompanies([...companies]);
    };


    const handleupdate = () => {
        console.log("entra a handleupdate");

        setLoading(true);
        companies.forEach((company) => {
            const coursesToSend = company.courses.map((c) => c.id);
            updateClient(company.id, { courses: coursesToSend })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };


    const columns = ["Seleccionar", "Nombre", "Email", "Telefono"];
    const properties = ["name", "email", "phone"];


    if (!course.id || !companies.length) {
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
                        id={id}
                        rows={companies}
                        columns={columns}
                        properties={properties}
                        handleChange={handleChange}
                        handleupdate={handleupdate}
                        loading={loading}


                    ></AsignCourseTable>

                </Box>
            </Box>
        );
};

export default CoursesToCompanies;
