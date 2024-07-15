import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    language: "vi",
    role: "for_rent",
  },
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
