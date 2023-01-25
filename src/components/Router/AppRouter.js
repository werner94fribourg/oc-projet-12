import { Navigate, Route, Routes } from 'react-router';
import User from '../../pages/User';

/**
 * Router of the Application, used to implementing a user's page in the application.
 *
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <Layout>
 *       <AppRouter />
 *     </Layout>
 *    );
 * };
 */
const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="user/12" replace />} replace />
      <Route path="user/:id" element={<User />} />
    </Routes>
  );
};

export default AppRouter;
