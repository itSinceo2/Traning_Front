import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserDetail, updateCourses } from "../../Services/UsersService";
import { Avatar, Box, Card, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { getClientDetail } from "../../Services/ClientsService";
import AsignCourseToUser from "../../Components/AsignCourseTable/AsignCourseToUser";

const UserDetail = () => {

    const [user, setUser] = useState({});
    const [companyCourses, setCompanyCourses] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [userCourses, setUserCourses] = useState([]);
    const { id } = useParams();




    useEffect(() => {
        const courses = user?.courses?.map(course => course.course.id);
        setUserCourses(courses);
    }, [user]);


    const handleChange = (e, row) => {

        if (userCourses.includes(row.id)) {
            setUserCourses(prevCourses => prevCourses.filter(id => id !== row.id));
        } else {
            setUserCourses(prevCourses => [...prevCourses, row.id]);
        }
 
    };


    const handleupdate = () => {
        
        updateCourses(id, { coursesId: userCourses })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        
    }

    useEffect(() => {
        getUserDetail(id).
            then(res => {

                setUser(res);
            })
            .catch(err => console.log(err));
    }
        , [id]);

    useEffect(() => {
        getClientDetail(user?.company).
            then(res => {
                setCompanyName(res.name);
                setCompanyCourses(res.courses);
            })
            .catch(err => console.log(err));
    }
        , [user?.company]);



    return (
        <Box className="ClientDetail" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', marginY: 2 }}>
                <Typography variant="h4"> Detalle de Cliente</Typography>
                <Avatar sx={{ width: '15vh', height: '15vh', margin: 2 }} src={user?.avatar} />
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: 2 }}>
                    <TableContainer component={Paper} sx={{ marginY: 2, minWidth: "80px" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Cursos Activos</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">{user?.username}</TableCell>
                                    <TableCell align="center">{companyName}</TableCell>
                                    <TableCell align="center">{user?.courses?.length}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column' }, margin: 2, justifyContent: 'space-around' }}>
                <Typography variant="h4"> Cursos</Typography>


                <AsignCourseToUser
                    userCourses={userCourses}
                    id={id}
                    rows={companyCourses}
                    columns={["Asignar", "Curso", "Descripción"]}
                    properties={["name", "description"]}
                    handleChange={handleChange}
                    handleupdate={handleupdate}
                    loading={false}
                />

            </Box>
        </Box>
    )
}

export default UserDetail   