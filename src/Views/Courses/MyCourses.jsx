import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAuthContext } from "../../Contexts/AuthContext";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import QuizIcon from '@mui/icons-material/Quiz';


const MyCourses = () => {


    const { user } = useAuthContext()

    const DateFormat = (date) => {
        const newDate = new Date(date)
        const day = newDate.getDate()
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    const myDedicationToHours = (dedication) => {
        const hours = Math.floor(dedication / 3600)
        const minutes = Math.floor((dedication - (hours * 3600)) / 60)
        const seconds = dedication - (hours * 3600) - (minutes * 60)
        return `${hours}h ${minutes}m ${seconds}s`
    }



    return (
        <Box className="MyCourses" sx={{ marginX: 2 }}>
            <Typography variant="h4" >Mis Cursos</Typography >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 10 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Curso</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Progreso</TableCell>
                                <TableCell>Fecha de inicio</TableCell>
                                <TableCell>Tiempo dedicado</TableCell>
                                <TableCell>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell>
                                        <Avatar src={course.course.mainImage} name={course.course.name} />

                                    </TableCell>
                                    <TableCell>{course.course.name}</TableCell>
                                    <TableCell>{course.progress.courseProgressPercent}%</TableCell>
                                    <TableCell>{DateFormat(course.startDate)}</TableCell>
                                    <TableCell width={10}>{myDedicationToHours(course.dedication)}</TableCell>
                                    <TableCell sx={{display:'flex', flexDirection:'row', gap:1}}>
                                        <Button
                                            variant="contained" color="primary" href={`/course/detail/${course.course.id}`}><RemoveRedEyeIcon/>
                                        </Button>
                                        {
                                            course.progress.courseProgressPercent === 100 &&
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                href={`/course/exam/${course.course.id}`}
                                            ><QuizIcon/></Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    );
}

export default MyCourses;