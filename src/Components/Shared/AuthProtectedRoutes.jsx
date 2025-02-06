import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoutes({ children }) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const decodeToken = jwtDecode(userToken);
    if(decodeToken.role == 'admin') {
      return <Navigate to="/admin" />;
    }else{
      return <Navigate to="/user" />;
    }
  }

  return children;
}
