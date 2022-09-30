import PropTypes from "prop-types";
import React from "react";
import { Image } from "@chakra-ui/react";
import { formatDate } from "../Services/handleDate";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

import styles from "../styles/product.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearProducts, deleteProduct } from "../Redux/Slices/products";

export default function ProductCard({
  id,
  name,
  isPerishable,
  manufacturingDate,
  expirationDate,
  price,
  unity,
  imgUrl,
  getProducts
}) {
  const dispacth = useDispatch()
  const handleDelete = async (id) => {
     await axios.delete(`http://localhost:3001/products/${id}`);
    dispacth(clearProducts());
    getProducts();
  };

  return (
    <div className={styles.product_cart}>
      <div className={styles.product__cart_name_img}>
        <h2>{name}</h2>
        <Image
          boxSize="10rem"
          objectFit="cover"
          src={`${imgUrl}`}
          alt={`${name}-image`}
        />
      </div>
      <div className={styles.product_cart__date}>
        <p>Data de Fabricação: {formatDate(manufacturingDate)}</p>
        <p>
          {isPerishable
            ? `Data de Validade: ${formatDate(expirationDate)}`
            : "Data de Validade: Não expira"}
        </p>
        <p>Produto perecível: {isPerishable ? "Sim" : "Não"}</p>
      </div>
      <div className={styles.product_cart__price}>
        <p>Preço: {price}</p>
        <p>Unidade: {unity}</p>
      </div>
      <div>
        <IconButton
          colorScheme="green"
          aria-label="Delete Product"
          size="sm"
          icon={<DeleteIcon />}
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  expirationDate: PropTypes.string.isRequired,
  isPerishable: PropTypes.bool.isRequired,
  manufacturingDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unity: PropTypes.string.isRequired,
};
