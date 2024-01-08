  import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
  import { useState } from "react";
  import { registerUser } from "../../Services/UsersService";
  import { useNavigate } from "react-router";

  const UsersForm = () => {
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      role: "",
    });

    const navigate = useNavigate();

    const roles = [
      {
        value: "Administrador SinCeO2",
        label: "Administrador SinCeO2",
      },
      {
        value: "Administrador",
        label: "Administrador",
      },
      {
        value: "Usuario",
        label: "Usuario",
      },

    ];


    const handleSubmit = (event) => {
      event.preventDefault();
      registerUser(user)
        .then((res) => {
          console.log(res)
          navigate('/users')
        })
    };

    const handleInputChange = (event) => {
      console.log(event.target.value);
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    };

    const handleSelectChange = (event) => {
      console.log(event.target.value);
      setUser({
        ...user,
        role: event.target.textContent,
      });
    }

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
          <Typography variant="h3">Users Form</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              name="username"
              onChange={handleInputChange}
              id="outlined-basic"
              label="Nombres y Apellidos"
              variant="outlined"
            />

            <TextField
              name="email"
              onChange={handleInputChange}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              name="password"
              onChange={handleInputChange}
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              type="password"
            />              
              <Autocomplete
                name="role"
                onChange={handleSelectChange}
                id="combo-box-demo"
                options={roles}
                sx={{ width: 300 }}
                value={user.role}
                renderInput={(params) => <TextField {...params} label="Rol" />}
              />

          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            {/* enviar */}
            <Button variant="contained" onClick={handleSubmit}>
              Enviar
            </Button>
          </Box>
        </Box>
      </form>
    );
  };

  export default UsersForm;
