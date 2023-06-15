import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingContainer from './components/LandingContainer';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from './pages/Main';
import NoPage from "./pages/NoPage";
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='main' element={<Main />} />
            <Route path='*' element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;