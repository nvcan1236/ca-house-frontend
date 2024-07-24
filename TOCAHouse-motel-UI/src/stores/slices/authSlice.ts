import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  showAuthModal: boolean;
  formType: "login" | "register";
} = {
  showAuthModal: false,
  formType: "login",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      return {
        ...state,
        showAuthModal: true,
      };
    },
    closeAuthModal: (state) => {
      return {
        ...state,
        showAuthModal: false,
      };
    },
    switchFormType: (
      state,
      action: PayloadAction<"login" | "register" | undefined>
    ) => {
      if (action.payload !== undefined) {
        state.formType = action.payload;
      } else {
        state.formType = state.formType === "login" ? "register" : "login";
      }
    },
  },
});

export default authSlice.reducer;
export const { openAuthModal, closeAuthModal, switchFormType } =
  authSlice.actions;
