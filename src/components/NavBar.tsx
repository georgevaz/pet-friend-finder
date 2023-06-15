import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Button } from '@mui/material';
import { useStore } from "zustand";
import useUserStore from "../store/userStore";

const NavBar = () => {
  const { isLoggedIn, setLoggedIn } = useStore(useUserStore);

  const handleLogout = async () => {
    try {
      const fetchResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const status = await fetchResponse.status;
      if (status === 200 ){
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    };
  };
  return(
    <>
      <nav className='nav-bar'>
        <Link to='/'>
          <img src='https://asset.brandfetch.io/id7Cm60rQf/idITbIwT7X.svg' style={{ height: '3em' }}/>
        </Link>
        <ul style={{ listStyle: 'none' }}>
          <li>
            {isLoggedIn ? 
          <>
            <Link to='/'>
              <Button variant='contained' className='button-primary' onClick={() => handleLogout()}>Logout</Button>
            </Link>
          </>
          
          : <>
            <Link to='/login'>
              <Button variant='contained' className='button-primary'>Login</Button>
            </Link>
          </>}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default NavBar;