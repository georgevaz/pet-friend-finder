import React, { useState, FocusEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useStore } from 'zustand';
import { TextField, Button } from '@mui/material';

const LoginContainer = () => {
  const { name, email, setName, setEmail, setLoggedIn } =
    useStore(useUserStore);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleNameChange = (e: string) => {
    setName(e);
    if (!e) setNameError(true);
    else setNameError(false);
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
    if (!e) setEmailError(true);
    else setEmailError(false);
  };

  const handleEmailUnfocus = (e: FocusEvent<HTMLInputElement>) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(e.target.value)) setEmailError(true);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nameError && !emailError && name && email) {
      try {
        const fetchResponse = await fetch(
          'https://frontend-take-home-service.fetch.com/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
            }),
            credentials: 'include',
          },
        );
        const status = await fetchResponse.status;
        if (status === 200) {
          setLoggedIn(true);
          navigate('/main');
        }
      } catch (error) {
        console.error(error);
      }
    } else console.log('error');
  };

  return (
    <>
      <div className="login-container">
        <div className="form-container">
          <p className="body-h4">Welcome!</p>
          <TextField
            className="input-textfield"
            id="outlined"
            label="Name"
            type="text"
            onChange={e => handleNameChange(e.target.value)}
            error={nameError}
            helperText={nameError ? 'Please provide valid name' : ''}
          />
          <TextField
            className="input-textfield"
            id="outlined"
            label="E-mail"
            type="email"
            onChange={e => handleEmailChange(e.target.value)}
            onBlur={handleEmailUnfocus}
            error={emailError}
            helperText={emailError ? 'Please provide valid email' : ''}
          />
          <Button
            variant="contained"
            className="button-primary-form"
            onClick={() => handleSubmit()}>
            Let&rsquo;s go!
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
