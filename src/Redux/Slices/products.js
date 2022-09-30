import { createSlice } from '@reduxjs/toolkit';

const initialState = []

export const productsSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    productsToState: (state, action) => {
      state.push(...action.payload);
    },
    clearProducts:(state) => {
      while(state.length) {
        state.pop()
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { productsToState, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
