import { Navigate, Route, Routes } from 'react-router';
import User from '../../pages/User';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="user/12" replace />} replace />
      <Route path="user/:id" element={<User />} />
    </Routes>
  );
};

export default AppRouter;
