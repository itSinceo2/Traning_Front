import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const UsersForm = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = [
    {
      value: "admnistrador",
      label: "Administrador",
    },
    {
      value: "Usuario",
      label: "Usuario",
    },
  ];

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
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
        <Typography variant="h3">Users Form</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            name="name"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
          />
          <TextField
            name="surname"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Apellidos"
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

          <TextField
            name="role"
            onChange={handleInputChange}
            id="outlined-select-currency-native"
            select
            label="Rol"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
