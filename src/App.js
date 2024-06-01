import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import { routes } from './routes/routes';
import { Suspense, lazy } from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';

const ErrorComponents = lazy(() => import('./components/common/ErrorComponents'));

// import ErrorComponents from './components/common/ErrorComponents';



function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
        <Route path={routes.main.path} element={<routes.main.element/>}>
          <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element/>} errorElement={<ErrorComponents />} />
          <Route path={routes.view.path} element={<routes.view.element/>} errorElement={<ErrorComponents />} />
        </Route>
        <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      </Routes>
    </Suspense>

    // <Main />

  );
}

export default App;
