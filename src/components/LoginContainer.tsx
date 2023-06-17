import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { useStore } from "zustand";
import { TextField, Button } from "@mui/material";


const LoginContainer = () => {
  const { name, email, isLoggedIn, setName, setEmail, setLoggedIn } = useStore(useUserStore);

  const handleNameChange = (e: string) => {
    setName(e);
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // check if valid e-mail. receive 400 status if @ or .com not in email entry but get access token anyway
    try {
      const fetchResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "email": email
      }),
        credentials: 'include',
      });
      const status = await fetchResponse.status;
      if (status === 200 ){
        setLoggedIn(true);
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <>
      <div className="login-container">
        <div className="form-container">
          <p className="body-h4">Welcome!</p>
          <TextField className="input-textfield" id="outlined" label="Name" onChange={(e) => handleNameChange(e.target.value)} />
          <TextField className="input-textfield" id="outlined" label="E-mail" onChange={(e) => handleEmailChange(e.target.value)} />
          <Button variant='contained' className='button-primary-form' onClick={() => handleSubmit()}>Let's go!</Button>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;