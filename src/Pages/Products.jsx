import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import styles from "../styles/product.module.css";
import { productsToState } from "../Redux/Slices/products";
import Header from "../Components/Header";
import ProductEdit from "../Components/ProductEdit";
import { isAuthenticated } from "../Services/handleLocalStorage";
import { useNavigate } from "react-router";
import handleRefresh from "../Services/handleRefresh";

export default function Products() {
  const [edit, setEdit] = useState(null);
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
  }, [products]);

  useEffect(() => {
    handleRefresh()
  }, []);

  

  return (
    <>
    <Header />
    <div className={styles.producs_page}>
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
          }, index) => (
            <>
            {edit === id ? (
              <ProductEdit
              key={`${name}-${index}`}
              id={id}
              name={name}
              isPerishable={isPerishable}
              manufacturingDate={manufacturingDate}
              expirationDate={expirationDate}
              price={price}
              unity={unity}
              imgUrl={imgUrl}
              getProducts={getProducts}
              setEdit={setEdit}
            />
            ) 
            : 
            (
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
                setEdit={setEdit}
              />
            )}
              
            </>
          )
        )}
    </div>
    </>
  );
}
