import { createSlice } from '@reduxjs/toolkit';

const initialState = []

export const productsSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    productsToState: (state, action) => {
      state.push(...action.payload);
    },

  },
});

// Action creators are generated for each case reducer function
export const { productsToState } = productsSlice.actions;

export default productsSlice.reducer;
