import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    showAuthModal: false,
  },
  reducers: {
    openAuthModal: (state) => {
      return {
        ...state, 
        showAuthModal: true
      }
    },
    closeAuthModal: (state) => {
      return {
        ...state, 
        showAuthModal: false
      }
    }
  }
});

export default authSlice.reducer
export const {openAuthModal, closeAuthModal} = authSlice.actions