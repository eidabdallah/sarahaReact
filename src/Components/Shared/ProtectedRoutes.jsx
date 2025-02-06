import {Navigate} from 'react-router-dom';

export default function ProtectedRoutes({children}) {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return <Navigate to='/' />;
  }
    return children;
}
