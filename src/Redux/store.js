import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Slices/login';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
