import React from 'react';
import {
  BrowserRouter,
  BrowserRouterProps,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import Footer from './components/Footer';

const App = () => {
  const routerProps: BrowserRouterProps = {};
  if (process.env.NODE_ENV === 'production') {
    routerProps['basename'] = '/pet-friend-finder/';
  }

  return (
    <>
      <div className="page-container">
        <BrowserRouter {...routerProps}>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="main" element={<Main />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
};

export default App;
