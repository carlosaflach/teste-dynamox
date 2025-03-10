import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import { Button, Input, Select } from "@chakra-ui/react";
import { validateDate } from "../Services/handleDate";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearProducts } from "../Redux/Slices/products";
import { IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import Header from "../Components/Header";

export default function CreateProducts() {
  const [name, setName] = useState("");
  const [isPerishable, setIsPerishable] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [showExpDate, setShowExpDate] = useState(false);
  const [price, setPrice] = useState("");
  const [unity, setUnity] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isValidDate, setIsValidDate] = useState(true);
  const [enableButton, setEnableButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    showExpirationInput();
    validateButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    isPerishable,
    manufacturingDate,
    expirationDate,
    showExpDate,
    price,
    unity,
    imgUrl,
  ]);

  useEffect(() => {
    if (expirationDate !== "") {
      const dateValid = validateDate(manufacturingDate, expirationDate);
      setIsValidDate(dateValid);
    }
  }, [expirationDate]);

  const showExpirationInput = () => {
    if (isPerishable === "Sim") {
      setShowExpDate(true);
    }
  };

  const handleSelect = (e) => {
    setIsPerishable(e.target.value);
    setShowExpDate(false);
  };

  const validateButton = () => {
    const isValidName = name.length >= 4;
    const isValidPerishable = isPerishable.length >= 3;
    const isValidManDate = manufacturingDate.length === 10;
    const isValidPrice = Number(price) > 0;
    const isValidUnity = unity.length >= 3;
    const isValidUrl = imgUrl.length >= 80;

    const freeButton =
      isValidName &&
      isValidPerishable &&
      isValidManDate &&
      isValidPrice &&
      isValidUnity &&
      isValidUrl;
    setEnableButton(freeButton);
  };

  const handleClick = async () => {
    const perishable = isPerishable === 'Sim' ? true : false;
    await axios.post("http://localhost:3001/products", {
      name,
      isPerishable: perishable,
      manufacturingDate,
      expirationDate,
      price,
      unity,
      imgUrl,
    });
    dispatch(clearProducts());
    navigate("/products");
  };

 
  return (
    <>
    <Header />
      <div className={styles.product_cart__create_new_product}>
        <form className={styles.product_cart__create_new_product__form}>
          <div>
            <label htmlFor="name">
              Nome do Produto:
              <Input
                type="text"
                id="name"
                placeholder="Insira o nome do produto"
                size="lg"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="isPerishable">
              O produto é perecível?
              <Select value={isPerishable} onChange={handleSelect}>
                <option value="">Escolha uma opção</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </Select>
            </label>
          </div>
          <div>
            <label htmlFor="manufacturingDate">
              Data de Fabricação
              <Input
                type="date"
                id="manufacturingDate"
                placeholder="Insira o nome do produto"
                size="lg"
                value={manufacturingDate}
                onChange={(e) => {
                  setManufacturingDate(e.target.value);
                }}
              />
            </label>
          </div>
          {showExpDate && (
            <div>
              <label htmlFor="expirationDate">
                Data de Validade
                <Input
                  type="date"
                  id="expirationDate"
                  placeholder="Insira o nome do produto"
                  size="lg"
                  value={expirationDate}
                  onChange={(e) => {
                    setExpirationDate(e.target.value);
                  }}
                />
              </label>
            </div>
          )}
          {!isValidDate ? (
            <span>Insira uma data de validade válida.</span>
          ) : null}
          <div>
            <label htmlFor="price">
              Preço do Produto
              <Input
                type="number"
                min={0}
                id="price"
                placeholder="Insira o preço do produto"
                size="lg"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="unity">
              Unidade do Produto:
              <Input
                type=""
                id="unity"
                placeholder="Unidade do produto Ex: 1 kg"
                size="lg"
                value={unity}
                onChange={(e) => {
                  setUnity(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="imgUrl">
              Endereço da Imagem do Produto:
              <Input
                type=""
                id="imgUrl"
                placeholder="Insira a URL"
                size="lg"
                value={imgUrl}
                onChange={(e) => {
                  setImgUrl(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <Button
              colorScheme="teal"
              size="md"
              disabled={!enableButton}
              onClick={handleClick}
              width="sm"
            >
              Criar novo produto
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
