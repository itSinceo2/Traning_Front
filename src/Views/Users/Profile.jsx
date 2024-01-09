import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router";


const Profile = () => {
    const { user } = useAuthContext();

    
    const { id } = useParams();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({
        username: "",
        avatar: "",
        email: "",
        password: "",
        role: "",
        company: "",
    });



    return (

        <Box sx={{ display: 'flex', flexDirection: 'column',  height:'100vh', width:'100%' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', margin: "2" }}>
                <Typography variant="h4"> Mi Perfil</Typography>

                    <Avatar sx={{ width: 200, height: 200, margin: 2 }} src={user.avatar} />
                
               <Typography variant="h5">{user.username}</Typography>
                <Typography variant="h6">{user.email}</Typography>
                <Typography variant="h6">{user.role}</Typography>
                <Typography variant="h6">{user.company.name}</Typography>

                <Button variant="contained" color="primary" sx={{ margin: 1 }} onClick={() => navigate(`/users/edit/${user.id}`)}>Editar Perfil</Button>


            </Card>
        </Box>
    );
}

export default Profile;