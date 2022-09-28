import React, { useEffect, useState } from 'react';
import {
  Button, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import styles from '../styles/login.module.css';
import axios from 'axios';
import createToken from '../Services/generateToken';
import { setLocalStorage } from '../Services/handleLocalStorage';
import { setLogin } from '../Redux/Slices/login';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [err, setErr] = useState('')
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();

  useEffect(() => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);
    const passMinLength = 6;
    const passValid = password.length >= passMinLength;
    const isValid = mailValidator && passValid;
    setEnableButton(isValid);
    setFailedTryLogin(false);
    setIsAuth(false);
  }, [email, password]);


  const handleLogin = async () => {
    const {data} = await axios.get(`http://localhost:3001/users/${email}`)
    if(!data || data.length === 0) {
      setErr('Usuário não encontrado');
      setFailedTryLogin(true);
      return
    }
    if(password !== data[0].userPassword) {
      setErr('Password Inválido');
      setFailedTryLogin(true);
      return
    }
    const token = createToken();
    setIsAuth(true);
    const { userEmail, username } = { ...data[0]}
    const AUTH = "@login-token"
    setLocalStorage(AUTH, {userEmail, token});
    dispatch(setLogin({userEmail, username}));
    setIsLogged(true);
  };  

  if(isLogged && isAuth) return <Navigate to='/products' />

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginContent}>
        <div>
          <label htmlFor="email">
            Email:
            <Input
              id="email"
              placeholder="Email"
              size="lg"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </label>
        </div>
        <div>
          <Button
            colorScheme="teal"
            size="md"
            disabled={!enableButton}
            onClick={handleLogin}
            width="sm"
          >
            Login
          </Button>
          { failedTryLogin ? (
            <p
              data-testid="common_login__element-invalid-email"
            >
              {err}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}