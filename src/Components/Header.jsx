import React from "react";
import { Button } from "@chakra-ui/react";
import styles from "../styles/header.module.css";
import { useLocation, useNavigate } from "react-router";
import { logout } from "../Services/handleLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts } from "../Redux/Slices/products";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = useLocation();
  const user = useSelector((state) => state.login.userName);


  const handleClick = () => {
    logout();
    dispatch(clearProducts());
    navigate("/login");
  };

  const goBack = () => {
    dispatch(clearProducts());
    navigate("/products");
  };

  return (
    <div className={styles.header}>
      {url.pathname === '/products' ? (
        <>
          <Button colorScheme="green" onClick={() => navigate("/products/create")}>
            Novo Produto
          </Button>
          <span>{`Olá ${user}, esses são os seus produtos!!`}</span>
          <Button colorScheme="green" onClick={handleClick}>
            Logout
          </Button>
        </>
      ): url.pathname === '/products/create' ? (
        <>
        <Button colorScheme="green" onClick={goBack}>
          Voltar
        </Button>
        <Button colorScheme="green" onClick={ handleClick }>
            Logout
        </Button>
        </>
      ) : (
        <>
        <Button colorScheme="green" onClick={() => navigate('/login')}>
          Voltar
        </Button>
        </>
      )}
      
    </div>
  );
}
