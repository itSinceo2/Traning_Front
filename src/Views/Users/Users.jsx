import { useEffect } from "react"
import { getUsersList } from "../../Services/UsersService"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import List from "../../Components/List/List"
import Search from "../../Components/Search/Search";
import { useAuthContext } from "../../Contexts/AuthContext"


const Users = () => {

    const { user: loggedUser } = useAuthContext();

    const company = loggedUser.company.id


    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        getUsersList()
            .then(res => {
                if (loggedUser.role === 'Administrador SinCeO2') {
                    setUsers(res)
                } else {
                    console.log('entra al else')
                    
                    const dataToRender = res.filter(user =>{
                        return user.company && user.company.id === company;
                    })
                    setUsers(dataToRender)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSearch = (filteredOptions) => {
        setFilteredUsers(filteredOptions)
    }

    return (
        !users ?
            <Box>Loading...</Box>
            :
            <Box className="Users" sx={{ marginX: 2 }}>
                <Typography variant="h3" >Usuarios</Typography >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Search
                        options={users}
                        searchLabel="Buscar usuario"
                        labelProp="username"
                        onSearch={handleSearch}
                    />
                    <Button href="/users/new" variant="contained" color="primary" sx={{ marginY: 2 }}>Agregar</Button>
                </Box>
                <Box sx={{ marginX: 10 }}>
                    <List
                        rows={filteredUsers?.length ? filteredUsers : users}
                        columns={['avatar', 'username', 'company.name', 'courses.length']}
                        headers={['Foto', 'Nombre', 'Empresa', 'Cursos']}
                    />
                </Box>
            </Box>
    )
}

export default Users