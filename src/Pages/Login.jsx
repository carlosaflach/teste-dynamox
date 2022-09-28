import React, { useEffect, useState } from 'react';
import {
  Button, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';

// import { useDispatch } from 'react-redux';
import styles from '../styles/login.module.css';
// import { setLogin } from '../Redux/Slices/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  // const dispatch = useDispatch();

  useEffect(() => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);
    const passMinLength = 6;
    const passValid = password.length >= passMinLength;
    const isValid = mailValidator && passValid;
    setEnableButton(isValid);
    setFailedTryLogin(false);
  }, [email, password]);



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
            
            width="sm"
          >
            Login
          </Button>
          { failedTryLogin ? (
            <p
              data-testid="common_login__element-invalid-email"
            >
              Usuário não encontrado
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}