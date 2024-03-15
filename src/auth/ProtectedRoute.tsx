import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
    // We can add here a Loading spinner to make it more fancy
  }

  if (isAuthenticated) {
    return <Outlet/>
  }

  return <Navigate to="/" replace/>;

}

export default ProtectedRoute