import PropTypes from "prop-types"
import React from 'react'
import { Image } from '@chakra-ui/react'
import { formatDate } from "../Services/handleDate"

import styles from '../styles/product.module.css'

export default function ProductCard({name, isPerishable, manufacturingDate, expirationDate, price, unity, imgUrl}) {

  return (
    <div className={styles.product_cart} >
      <div className={styles.product__cart_name_img}>
      <h2>{name}</h2>
      <Image
        boxSize='10rem'
        objectFit='cover'
        src={`${imgUrl}`}
        alt={`${name}-image`}
        />
      </div>
      <div className={styles.product_cart__date}>
        <p>Data de Fabricação: {formatDate(manufacturingDate)}</p>
        <p>Data de Validade: {formatDate(expirationDate)}</p>
        <p>Produto perecível: {isPerishable ? 'Sim' : 'Não'}</p>
      </div>
      <div className={styles.product_cart__price}>
        <p>Preço: {price}</p>
        <p>Unidade: {unity}</p>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  expirationDate: PropTypes.string.isRequired,
  isPerishable: PropTypes.bool.isRequired,
  manufacturingDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unity: PropTypes.string.isRequired
}
