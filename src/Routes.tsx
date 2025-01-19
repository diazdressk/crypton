import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Profile } from './components/Profile';
import { RegisterForm } from './components/RegisterForm';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </RouterRoutes>
  );
}