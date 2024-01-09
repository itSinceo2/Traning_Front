import { Avatar, Box, Button, Card, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import CourseStatus from "../../Components/CourseStatus/CourseStatus";
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';


const Profile = () => {
    const { user } = useAuthContext();

    const navigate = useNavigate();

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', margin: "2" }}>
                <Typography variant="h4"> Mi Perfil</Typography>
                <Avatar sx={{ width: '15vh', height: '15vh', margin: 2 }} src={user.avatar} />
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: 2 }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                           <ListItemAvatar>
                            <Avatar><BadgeIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Nombre" secondary={user.username} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><EmailIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Email" secondary={user.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><LocationCityIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Empresa" secondary={user.company.name} />
                        </ListItem>
                    </List>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <Typography variant="subtitle"><b>Mis Cursos</b></Typography>
                        <CourseStatus courses={user.courses} />
                    </Box>
                </Box>

                <Button variant="contained" color="primary" sx={{ margin: 1 }} onClick={() => navigate(`/users/edit/${user.id}`)}>Editar Perfil</Button>


            </Card>
        </Box>
    );
}

export default Profile;