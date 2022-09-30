import PropTypes from "prop-types";
import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import { formatDate } from "../Services/handleDate";
import { IconButton, Input, Select } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import styles from "../styles/product.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearProducts, deleteProduct } from "../Redux/Slices/products";

export default function ProductEdit({
  id,
  name,
  isPerishable,
  manufacturingDate,
  expirationDate,
  price,
  unity,
  imgUrl,
  getProducts,
}) {
  // const dispatch = useDispatch()

  // const handleDelete = async (id) => {
  //    await axios.delete(`http://localhost:3001/products/${id}`);
  //    dispatch(clearProducts());
  //   getProducts();
  // };

  const [nameEdit, setNameEdit] = useState(name);
  const [manDateEdit, setManDateEdit] = useState(manufacturingDate);
  const [expDateEdit, setExpDateEdit] = useState(expirationDate);
  const [perishableEdit, setPerishableEdit] = useState(isPerishable);
  const [priceEdit, setPriceEdit] = useState(price);
  const [unitEdit, setUnitEdit] = useState(unity);

  return (
    <div className={styles.product_cart}>
      <div className={styles.product__cart_name_img}>
        <label htmlFor="nameEdit">
          <Input
            type="text"
            id="nameEdit"
            value={nameEdit}
            onChange={(e) => {
              setNameEdit(e.target.value);
            }}
            placeholder="Nome do Produto"
            size="sm"
          />
        </label>
        <Image
          boxSize="10rem"
          objectFit="cover"
          src={`${imgUrl}`}
          alt={`${name}-image`}
        />
      </div>
      <div className={styles.product_cart__date}>
        <label htmlFor="manDateEdit">
          <Input
            id="manDateEdit"
            type="date"
            value={manDateEdit}
            onChange={(e) => {
              setManDateEdit(e.target.value);
            }}
            placeholder="Data de Fabricação"
            size="sm"
          />
        </label>
        <p>
          {isPerishable ? (
            <label htmlFor="expDateEdit">
              <Input
                id="manDateEdit"
                type="date"
                value={expDateEdit}
                onChange={(e) => {
                  setExpDateEdit(e.target.value);
                }}
                placeholder="Data de Validade"
                size="sm"
              />
            </label>
          ) : (
            "Data de Validade: Não expira"
          )}
        </p>
        <label htmlFor="isPerishable">
          O produto é perecível?
          <Select
            value={isPerishable}
            size="sm"
            onChange={(e) => setPerishableEdit(e.target.value)}
          >
            <option value="">Escolha uma opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Select>
        </label>
      </div>
      <div className={styles.product_cart__price}>
        <label htmlFor="priceEdit">
          Preço do Produto
          <Input
            type="number"
            min={0}
            id="priceEdit"
            placeholder="Insira o preço do produto"
            size="sm"
            value={priceEdit}
            onChange={(e) => {
              setPriceEdit(e.target.value);
            }}
          />
        </label>
        <label htmlFor="unitEdit">
          Unidade do Produto:
          <Input
            type=""
            id="unitEdit"
            placeholder="Unidade do produto Ex: 1 kg"
            size="sm"
            value={unitEdit}
            onChange={(e) => {
              setUnitEdit(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <IconButton
          colorScheme="green"
          aria-label="Delete Product"
          size="sm"
          icon={<CheckCircleIcon />}
          // onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
}

