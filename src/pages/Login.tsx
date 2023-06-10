import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataStore from "../store/store";
import { useStore } from "zustand";

const Login = () => {
  const { name, email, setName, setEmail } = useStore(useDataStore);

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
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <>
      <p>Login</p>
      <input type="text" placeholder="Name" onChange={(e) => handleNameChange(e.target.value)} />
      <input type="text" placeholder="E-mail" onChange={(e) => handleEmailChange(e.target.value)} />
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
};

export default Login;