import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { updateUser } from "../../Services/UsersService";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Contexts/AuthContext";

const UsersEditForm = () => {
  const { user: loggedUser } = useAuthContext();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });


console.log(loggedUser)

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    //enviando sólo la key y su valor para actualizar
    const objetToSend = {};
    for (const key in user) {
      if (user[key] !== "") {
        objetToSend[key] = user[key];
      }
    }

    updateUser(loggedUser.id, objetToSend, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        navigate("/users/profile/:id");
      });
  };

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h3">Actualizar los datos</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* formulario relleno con los datos del usuario */}
            <TextField
              name="username"
              label={loggedUser.username ? loggedUser.username : "Nombre de usuario"}
              variant="outlined"
              value={user.username}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label={loggedUser.email}
              variant="outlined"
              value={user.email}
              onChange={handleInputChange}
            />
            <TextField
              name="password"
              label={loggedUser.password ? "********" : "Contraseña"}
              variant="outlined"
              value={user.password}
              onChange={handleInputChange}
            />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Actualizar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UsersEditForm;
