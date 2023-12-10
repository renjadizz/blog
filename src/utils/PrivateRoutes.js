import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  return auth ? <Outlet context={auth} /> : <Navigate to="/" />;
};
export default PrivateRoutes;
