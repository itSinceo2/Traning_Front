/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '/src/Contexts/AuthContext';
import Navbar from "../Navbar/Navbar";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  const Page = () => {
    return (
      <>
        <Outlet />
      </>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
    <Navbar />
    {Page()}
    </>
  );
}

export default ProtectedRoute;
