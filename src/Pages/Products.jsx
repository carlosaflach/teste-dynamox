import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

export default function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    const {data} = await axios.get('http://localhost:3001/products')
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  },[]);

 
  return (
    <div>
      <h1>Produtos</h1>
    </div>
  )
}
