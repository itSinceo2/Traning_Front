
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'
import { useAuthContext } from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute'
import { createTheme, ThemeProvider } from '@mui/material/styles';




function App() {
  const { isAuthenticationFetched } = useAuthContext()

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#701227',
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
          </Route>
          <Route path="/login" element={<Login />} />
      </Routes >
        )
}
    </ThemeProvider >
  )
}

export default App;


