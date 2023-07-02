import React from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  Routes,
  Route,
  HashRouter,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import Footer from './components/Footer';

const App = () => {
  const routerProps: BrowserRouterProps = {};
  if (process.env.REACT_APP_ENV === 'gh') {     // NOTE only including because 'basename' breaks local
    routerProps['basename'] = '/pet-friend-finder/';
  }
  return (
    <>
      <div className="page-container">
        {/* <BrowserRouter {...routerProps}> */}
        <HashRouter {...routerProps}>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="main" element={<Main />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        {/* </BrowserRouter> */}
        </HashRouter>
        <Footer />
      </div>
    </>
  );
};

export default App;
