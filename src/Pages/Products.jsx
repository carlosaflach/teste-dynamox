import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProductCard from "../Components/ProductCard";
import styles from "../styles/product.module.css";
import { productsToState } from "../Redux/Slices/products";
import { Button } from '@chakra-ui/react'

export default function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispacth = useDispatch();

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    setProducts(data);
  };

  const sendProductsToState = () => {
    if(products.length > 0) dispacth(productsToState(products))
  };

  useEffect(() => {
    sendProductsToState()
  }, [products])

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div className={styles.producs_page}>
      {products &&
        products.map(({name, isPerishable, manufacturingDate, expirationDate, price, unity, imgUrl}) => (
        <ProductCard key={name} 
          name={name}
          isPerishable={isPerishable}
          manufacturingDate={manufacturingDate}
          expirationDate={expirationDate}
          price={price}
          unity={unity}
          imgUrl={imgUrl}
        />
        ))}
      <Button colorScheme='green' className={styles.producs_page__btn}>Novo Produto</Button>
    </div>
  );
}
