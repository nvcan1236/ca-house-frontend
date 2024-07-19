/* eslint-disable react-hooks/rules-of-hooks */
import { language, role } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState : {
  language:language,
  role: role
} = {
  language: "vi",
  role: "for_rent",
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    switchLanguage: (state, { payload }) => {
      
      return {
        ...state,
        language: payload,
      };
    },
    switchRole: (state) => {
      return {
        ...state,
        role: state.role === "for_rent" ? "for_lease" : "for_rent",
      };
    },
  },
});

export const { switchLanguage, switchRole } = commonSlice.actions;
export default commonSlice.reducer;
