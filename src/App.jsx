
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import { useAuthContext } from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Clients from './Views/Clients/Clients'
import ClientsForm from './Views/Clients/ClientsForm'
import Courses from './Views/Courses/Courses'
import Users from './Views/Users/Users'
import CoursesForm from './Views/Courses/CoursesForm'




function App() {
  const { isAuthenticationFetched } = useAuthContext()

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#701227',
      },
      secondary: {
        main: '#bdbdbd',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
        {!isAuthenticationFetched ? (
          <h1>...loading</h1>
          ) : (
            
            <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            {/* Clients */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/new" element={<ClientsForm />} />


            {/* Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/new" element={<CoursesForm />} />



            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
      </Routes >
        )
}
    </ThemeProvider >
  )
}

export default App;


