import { useEffect, useState } from "react";
import List from "../../Components/List/List";
import { getClientsList } from "../../Services/ClientsService";
import Search from "../../Components/Search/Search";
import { Box, Button, Typography } from "@mui/material";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    getClientsList().then((response) => {
      setClients(response);
    });
  }, []);

  const handleSearch = (filteredOptions) => {
    setFilteredClients(filteredOptions);
  };

  return (
    !clients ? 
    <Box>Loading...</Box>
    :

    <Box className="Clients" sx={{ marginX: 2 }}>
      <Typography variant="h3" >Clientes</Typography >
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Search
        options={clients}
        searchLabel="Buscar empresa"
        labelProp="name"
        onSearch={handleSearch}
      />
      <Button href="/clients/new" variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar</Button>
      </Box>
      <List
        rows={filteredClients?.length ? filteredClients : clients}
        columns={['name', 'courses.length', 'users.length']}
        headers={['Empresa', 'Cursos', 'Alumnos']}
      />
    </Box>
  );
}

export default Clients;
