import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import styles from "../styles/product.module.css";
import { productsToState } from "../Redux/Slices/products";
import Header from "../Components/Header";

export default function Products() {
  const dispacth = useDispatch();
  const products = useSelector((state) => state.products);

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    dispacth(productsToState(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {

  }, [products])

  return (
    <>
    <Header />
    <div className={styles.producs_page}>
      {products && console.log(products)}
      {products &&
        products.map(
          ({
            id,
            name,
            isPerishable,
            manufacturingDate,
            expirationDate,
            price,
            unity,
            imgUrl,
          }) => (
            <ProductCard
              key={name}
              id={id}
              name={name}
              isPerishable={isPerishable}
              manufacturingDate={manufacturingDate}
              expirationDate={expirationDate}
              price={price}
              unity={unity}
              imgUrl={imgUrl}
              getProducts={getProducts}
            />
          )
        )}
    </div>
    </>
  );
}
