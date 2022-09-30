import React from 'react'
import { Button } from "@chakra-ui/react";
import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router';
import { logout } from '../Services/handleLocalStorage';
import { useDispatch } from 'react-redux';
import { clearProducts } from '../Redux/Slices/products';


export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleClick = () => {
    logout();
    dispatch(clearProducts())
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
