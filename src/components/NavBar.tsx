import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Button } from '@mui/material';

const NavBar = () => {
  return(
    <>
      <nav className='nav-bar'>
        <img src='https://asset.brandfetch.io/id7Cm60rQf/idITbIwT7X.svg' />
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Link to='/login'>
              <Button variant='contained' className='button-primary'>Login</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default NavBar;