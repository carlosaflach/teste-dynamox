import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  userName: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.email = action.payload.userEmail;
      state.userName = action.payload.username;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
