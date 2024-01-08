import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { registerUser } from "../../Services/UsersService";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Contexts/AuthContext";
import { getClientsList } from "../../Services/ClientsService";

const UsersForm = () => {
  const { user: loggedUser } = useAuthContext();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    company: loggedUser.role === "Administrador SinCeO2" ? "" : loggedUser.company.id
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getClientsList()
      .then((res) => setCompanies(res))
      .catch((err) => console.log(err));
  }, []);


  const navigate = useNavigate();

  //obtener el usuario logeado del contexto

  console.log(companies);

  let roles = [];
  let companiesList = companies.map(company => company.name)
  console.log(companiesList)


  if (loggedUser.role === "Administrador SinCeO2") {
    roles = [
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

  } else {
    roles = [
      {
        value: "Administrador",
        label: "Administrador",
      },
      {
        value: "Usuario",
        label: "Usuario",
      },
    ];
  }


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

  const handleSelectRoleChange = (event) => {
    console.log(event.target.value);
    setUser({
      ...user,
      role: event.target.textContent,
    });
  }

  const handleSelectCompanyChange = (event) => {
    console.log(event.target.value);
    const companyId = companies.find(company => company.name === event.target.textContent).id
    setUser({
      ...user,
      company: companyId
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
            autoComplete="off"
          />

          <TextField
            name="email"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="off"
          />
          <TextField
            name="password"
            onChange={handleInputChange}
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            type="password"
            autoComplete="off"
          />
          <Autocomplete
            name="role"
            onChange={handleSelectRoleChange}
            id="combo-box-demo"
            options={roles}
            sx={{ width: 300 }}
            value={user.role}
            renderInput={(params) => <TextField {...params} label="Rol" />}
          />
          {
            loggedUser.role === "Administrador SinCeO2"
              ?
              <Autocomplete
                name="company"
                onChange={handleSelectCompanyChange}
                id="combo-box-demo"
                options={companiesList}
                sx={{ width: 300 }}
                value={companiesList.find(company => company.id === user.company)}
                renderInput={(params) => <TextField {...params} label="Empresa" />}
              />

              :
              <Typography variant="subtitle2">Empresa: <b>{loggedUser.company.name}</b></Typography>
          }

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
