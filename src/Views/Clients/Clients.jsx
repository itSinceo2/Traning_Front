import { useEffect, useState } from "react";
import List from "../../Components/List/List";
import { getClientsList } from "../../Services/ClientsService";
import Search from "../../Components/Search/Search";

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
    <div>Loading...</div>
    :
    <div>
      <h1>Clients</h1>
      <Search
        options={clients}
        searchLabel="Buscar empresa"
        labelProp="name"
        onSearch={handleSearch}
      />
      <List
        rows={filteredClients?.length ? filteredClients : clients}
        columns={['name', 'courses.length', 'users.length']}
        headers={['Empresa', 'Cursos', 'Alumnos']}
      />
    </div>
  );
}

export default Clients;
