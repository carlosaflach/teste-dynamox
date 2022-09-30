import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { formatDate, validateDate } from "../Services/handleDate";
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
  setEdit
}) {
  const [nameEdit, setNameEdit] = useState(name);
  const [manDateEdit, setManDateEdit] = useState(manufacturingDate);
  const [expDateEdit, setExpDateEdit] = useState(expirationDate);
  const [perishableEdit, setPerishableEdit] = useState(isPerishable);
  const [showExpDate, setShowExpDate] = useState(false);
  const [priceEdit, setPriceEdit] = useState(price);
  const [unitEdit, setUnitEdit] = useState(unity);
  const [isValidDate, setIsValidDate] = useState(true);
  const [enableButton, setEnableButton] = useState(false);
  const dispatch = useDispatch()

  const handleSave = async (id) => {
    const perishable = perishableEdit === 'Sim' ? true : false;
    await axios.put(`http://localhost:3001/products/${id}`,{
      name: nameEdit,
      isPerishable: perishable,
      manufacturingDate: manDateEdit,
      expirationDate: expDateEdit,
      price: priceEdit,
      unity: unitEdit,
      imgUrl
    });
    dispatch(clearProducts());
    setEdit(null)
    getProducts();
 };

 useEffect(() => {
  showExpirationInput();
  validateButton();
 }, [nameEdit, 
  perishableEdit, 
  manDateEdit,
  expDateEdit,
  showExpDate,
  priceEdit, 
  unitEdit]);

 useEffect(() => {
  if (expDateEdit !== "") {
    const dateValid = validateDate(manDateEdit, expDateEdit);
    setIsValidDate(dateValid);
  }
}, [expDateEdit]);

const showExpirationInput = () => {
  if (perishableEdit === "Sim") {
    setShowExpDate(true);
  }
};

const validateButton = () => {
  const isValidName = nameEdit.length >= 4;
  const isValidPerishable = perishableEdit.length >= 3;
  const isValidManDate = manDateEdit.length === 10;
  const isValidPrice = Number(priceEdit) > 0;
  const isValidUnity = unitEdit.length >= 3;
  const isValidExpDate = expDateEdit === '' ? true : validateDate(manDateEdit,expDateEdit);

  const freeButton =
    isValidName &&
    isValidPerishable &&
    isValidManDate &&
    isValidPrice &&
    isValidUnity && isValidExpDate;

  setEnableButton(freeButton);
};

const handleSelect = (e) => {
  setPerishableEdit(e.target.value);
  setShowExpDate(false);
};

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
            size="xs"
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
        <label htmlFor="isPerishable">
          O produto é perecível?
          <Select
            value={perishableEdit}
            size="xs"
            onChange={handleSelect}
          >
            <option value="">Escolha uma opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Select>
        </label>
        <label htmlFor="manDateEdit">
          Data de Fabricação
          <Input
            id="manDateEdit"
            type="date"
            value={manDateEdit}
            onChange={(e) => {
              setManDateEdit(e.target.value);
            }}
            placeholder="Data de Fabricação"
            size="xs"
          />
        </label>
        {showExpDate && (
            <div>
              <label htmlFor="expirexpDateEditationDate">
                Data de Validade
                <Input
                  type="date"
                  id="expDateEdit"
                  placeholder="Insira o nome do produto"
                  size="xs"
                  value={expDateEdit}
                  onChange={(e) => {
                    setExpDateEdit(e.target.value);
                  }}
                />
              </label>
            </div>
          )}
          {!isValidDate ? (
            <span>Insira uma data válida.</span>
          ) : null}
      </div>
      <div className={styles.product_cart__price}>
        <label htmlFor="priceEdit">
          Preço:
          <Input
            type="number"
            min={0}
            id="priceEdit"
            size="xs"
            value={priceEdit}
            onChange={(e) => {
              setPriceEdit(e.target.value);
            }}
          />
        </label>
        <label htmlFor="unitEdit">
          Unidade:
          <Input
            type=""
            id="unitEdit"
            placeholder="Unidade do produto Ex: 1 kg"
            size="xs"
            value={unitEdit}
            onChange={(e) => {
              setUnitEdit(e.target.value);
            }}
          />
        </label>
      </div>
      <div className={styles.product_cart__edit__btns}>
        <IconButton
          colorScheme="green"
          aria-label="Delete Product"
          size="sm"
          disabled={!enableButton}
          icon={<CheckCircleIcon />}
          onClick={() => handleSave(id)}
        />
      </div>
    </div>
  );
}

