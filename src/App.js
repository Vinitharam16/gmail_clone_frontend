import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './routes/routes';
import { Fragment, Suspense, lazy, useEffect, useState } from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';
import ContextProvider from './context/ContextProvider';
import { useSelector } from 'react-redux';
import Login from './components/Authentication/Form/Login';
import SignUp from './components/Authentication/Form/SignUp';
const ErrorComponents = lazy(() => import('./components/common/ErrorComponents'));



function App() {
  const { isLoggedIn } = useSelector((state) => state.authreducer)

  function renderRoutes(isLoggedIn = false) {
    if (!isLoggedIn) {
      return (
        <Fragment>
          <Route path='/login' element={<Login/>} errorElement={<ErrorComponents />}/>
          <Route path='/' element={<SignUp/>} errorElement={<ErrorComponents />}/>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
          <Route path={routes.main.path} element={<routes.main.element />}>
            <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponents />} />
            <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponents />} />
          </Route>
          <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
        </Fragment>
      )

    }
  }


  // if a token exists, try to get the user data from the server,
  // if this fetch has succeeded, App will redirect us to the emails page
  // if this fetch failed, that means the token has expired and the user needs to login
  // useEffect(() => {
  //   if (token) {
  //     dispatch(getUserAction());
  //   }
  // }, [token, dispatch]);


  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ContextProvider>
        <Routes>
          {renderRoutes(isLoggedIn)}
        </Routes>
      </ContextProvider>
    </Suspense>
  );
}

export default App;
