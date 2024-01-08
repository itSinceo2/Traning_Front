import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditableTag from "../../Components/EditableTag/EditableTag";
import { useNavigate, useParams } from "react-router";
import { updateUser } from "../../Services/UsersService";





const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
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

    const addContent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", userProfile.username);
        formData.append("email", userProfile.email);
        formData.append("password", userProfile.password);
        formData.append("avatar", userProfile.avatar instanceof File ? userProfile.avatar : undefined);

        try {
            const data = await updateUser(id, formData, { headers: { "Content-Type": "multipart/form-data" } });
            setUserProfile((prevUserProfile) => ({ ...prevUserProfile, content: data.content || [] }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddContent = (event) => {
        const { name, value, files } = event.target;

        setUserProfile((prevUserProfile) => ({
            ...prevUserProfile,
            [name]: files ? files[0] : value,
        }));
    }

  
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleImageChange = (e) => {
        e.preventDefault()
        const files = e.target.files;
        console.log(files)
        setIsEditing(false);
    }



    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '90%', margin: "2" }}>
                <Typography variant="h4"> Mi Perfil</Typography>
                {isEditing ?
                    <form action="submit" encType="multipart/form-data">
                        <input type="file" name="avatar" id="avatar" />
                        <label htmlFor="avatar">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                type="submit"
                            >
                                Upload
                            </Button>
                        </label>
                    </form>
                    :
                    <Avatar sx={{ width: 200, height: 200, margin: 2 }} src={user.avatar} onDoubleClick={handleDoubleClick} />
                }

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                    <EditableTag
                        name="username"
                        sx={{ marginBottom: 1 }}
                        typeOfTag={"h5"}
                        initialValue={user.username ? `Nombres y apellidos: ${user.username}` : ""}
                    />
                </Box>
                {/* email */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                    <EditableTag
                        name="email"
                        sx={{ marginBottom: 1 }}
                        typeOfTag={"body2"}
                        initialValue={user.email ? `correo: ${user.email}` : ""}
                    />
                    {/* password */}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                    <EditableTag
                        name="password"
                        sx={{ marginBottom: 1 }}
                        typeOfTag={"body2"}
                        initialValue={user.password ? `contraseña ${user.password}` : "Contraseña"}
                    />
                </Box>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Rol: {user.role}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Empresa: {user.company.name}</Typography>


            </Card>
        </Box>
    );
}

export default Profile;