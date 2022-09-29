import React from 'react'
import { Button } from "@chakra-ui/react";
import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router';
import { logout } from '../Services/handleLocalStorage';


export default function Header() {
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className={styles.header}>
      <Button colorScheme="green" onClick={() => navigate('/products/create')}>
        Novo Produto
      </Button>
      <Button colorScheme="green" onClick={ handleClick }>
        Logout
      </Button>
    </div>
  )
}
