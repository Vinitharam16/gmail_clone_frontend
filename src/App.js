import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes';
import { Suspense, lazy } from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';
import ContextProvider from './context/ContextProvider';

const ErrorComponents = lazy(() => import('./components/common/ErrorComponents'));

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ContextProvider>
        <Routes>
          <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
          <Route path={routes.main.path} element={<routes.main.element />}>
            <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponents />} />
            <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponents />} />
          </Route>
          <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
        </Routes>
      </ContextProvider>
    </Suspense>
  );
}

export default App;
