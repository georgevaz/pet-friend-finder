import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useStore } from 'zustand';
import { TextField, Button } from '@mui/material';

const LoginContainer = () => {
  const { name, email, isLoggedIn, setName, setEmail, setLoggedIn } =
    useStore(useUserStore);
  const [nameError, setNameError] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setName('');
      setEmail('');
    }
  }, []);

  const handleNameChange = (e: string) => {
    setName(e);
    if (!e) {
      setNameError(true);
      setButtonDisable(true || emailError);
    } else {
      setNameError(false);
      setButtonDisable(false || emailError);
    }
  };

  const handleEmailChange = (e: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmail(e);
    if (!e || !re.test(e)) {
      setEmailError(true);
      setButtonDisable(true || nameError);
    } else {
      setEmailError(false);
      setButtonDisable(false || nameError);
    }
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
    } else {
      if (!name) setNameError(true);
      if (!email) setEmailError(true);
    }
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
            onBlur={e => handleNameChange(e.target.value)}
            error={nameError}
            helperText={nameError ? 'Please provide a valid name' : ''}
          />
          <TextField
            className="input-textfield"
            id="outlined"
            label="E-mail"
            type="email"
            onChange={e => handleEmailChange(e.target.value)}
            onBlur={e => handleEmailChange(e.target.value)}
            error={emailError}
            helperText={emailError ? 'Please provide a valid email' : ''}
          />
          <Button
            variant="contained"
            className="button-primary-form"
            disabled={buttonDisable}
            onClick={() => handleSubmit()}>
            Let&rsquo;s go!
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
