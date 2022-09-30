import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";

export default function CreateProducts() {
  const [name, setName] = useState("");
  const [isPerishable, setIsPerishable] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [showExpDate, setShowExpDate] = useState(false);
  const [price, setPrice] = useState('');
  const [unity, setUnity] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (isPerishable === "Sim") {
      setShowExpDate(true);
    }
  }, [name, isPerishable, showExpDate, price, unity, imgUrl]);

  const handleSelect = (e) => {
    setIsPerishable(e.target.value);
    setShowExpDate(false);
  };

  return (
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
        <div>
          <label htmlFor="price">
            Preço do Produto
            <Input
              type=""
              id="price"
              placeholder="Insira o preço do produto"
              size="lg"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value).toFixed(2));
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
      </form>
    </div>
  );
}
