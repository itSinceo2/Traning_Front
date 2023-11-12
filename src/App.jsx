
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './Views/Login/Login'
import Home from './Views/Home/Home'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>

  )
}

export default App
