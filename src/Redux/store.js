import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Slices/login';
import productsReducer from './Slices/products';

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  },
});

export default store;
