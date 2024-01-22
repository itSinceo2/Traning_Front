import { useEffect, useState } from "react";
import { getClientDetail } from "../../Services/ClientsService";
import { useParams } from "react-router";
import { Avatar, Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        getClientDetail(id)
            .then(res => {
                console.log(res);
                setClient(res);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <Box className="ClientDetail" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', marginY: 2 }}>
                <Typography variant="h4"> Detalle de Cliente</Typography>
                <Avatar sx={{ width: '15vh', height: '15vh', margin: 2 }} src={client?.logo} />
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: 2 }}>
                    <TableContainer component={Paper} sx={{ marginY: 2, minWidth: "80px" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>NIF</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                    <TableCell>Cursos</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">{client?.name}</TableCell>
                                    <TableCell align="center">{client?.nif}</TableCell>
                                    <TableCell align="center">{client?.email}</TableCell>
                                    <TableCell align="center">{client?.phone}</TableCell>
                                    <TableCell align="center">{client?.courses.length}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, margin: 2, justifyContent: 'space-around' }}>
                <Box>
                    <Typography variant="h4"> Cursos</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: 2 }}>
                        <TableContainer component={Paper} sx={{ marginY: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="center">Alumnos</TableCell>
                                        <TableCell align="center">Evaluaciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {client?.courses.map((course) => (
                                        <TableRow key={course.name}>
                                            <TableCell align="center">{course.name}</TableCell>
                                            <TableCell align="right">{course.students.length}</TableCell>
                                            <TableCell align="right">{course.tests.length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h4"> Trabajadores</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: 2 }}>
                        <TableContainer component={Paper} sx={{ marginY: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="right">Cursos</TableCell>
                                        <TableCell align="right">Rol</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {client?.users.map(worker => (
                                        <TableRow key={worker.id}>
                                            <TableCell align="center">{worker.username}</TableCell>
                                            <TableCell align="right">{worker.courses.length}</TableCell>
                                            <TableCell align="right">{worker.role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ClientDetail;
