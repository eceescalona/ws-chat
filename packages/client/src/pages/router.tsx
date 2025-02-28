import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './page-not-found';
import { RegistrationPage } from './registration-page';
import { LoginPage } from './login-page';
import { LobbyPage } from './lobby-page';
import { useAuth } from '../auth/use-auth.hook';
import { Room } from '../room/room';
import { HomePage } from './home-page';

const ProtectedRoute = () => {
  const auth = useAuth();
  const token = auth.getToken();

  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="register" element={<RegistrationPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="lobby" element={<LobbyPage />} />
        <Route path="lobby/room/:roomId" element={<Room />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
