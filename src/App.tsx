import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingContainer from './components/LandingContainer';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;