import Layout from './components/Layout/Layout';
import AppRouter from './components/Router/AppRouter';

/**
 * Main Component of the application.
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
const App = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
