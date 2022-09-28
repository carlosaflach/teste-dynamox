import React, { useEffect, useState } from 'react'
import {
  Button, Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import styles from '../styles/login.module.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [enableButton, setEnableButton] = useState(false);

  const navigate = useNavigate();
  const passMinLength = 6;
  const nameMinLength = 4;

  useEffect(() => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);
    const isNameValid = name.length >= nameMinLength;
    const passValid = password.length >= passMinLength;
    const isValid = mailValidator && passValid && isNameValid;
    setEnableButton(isValid);
  }, [email, name, password]);

  const handleClick = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/users', {
      userEmail: email,
      username: name,
      userPassword: password
    });
    navigate('/login');
  }

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
          <label htmlFor="name">
            Name:
            <Input
              id="name"
              placeholder="Name"
              size="lg"
              value={name}
              onChange={(e) => { setName(e.target.value); }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <Input
              id="password"
              placeholder="Password"
              size="lg"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
          </label>
        </div>
        <div className={styles.btns}>
          <Button
            colorScheme="teal"
            size="md"
            width="sm"
            disabled={!enableButton}
            onClick={(e) => {handleClick(e)}}
          >
            Register
          </Button>
        </div>

      </form>
    </div>
  )
}
