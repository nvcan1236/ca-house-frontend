/* eslint-disable react-hooks/rules-of-hooks */
import AmenityInfo from "@/pages/createMotel/AmenityInfo";
import LocationInfo from "@/pages/createMotel/LocationInfo";
import PriceInfo from "@/pages/createMotel/PriceInfo";
import RegularInfo from "@/pages/createMotel/RegularInfo";
import RequirementInfo from "@/pages/createMotel/RequirementInfo";
import UploadMotelImage from "@/pages/createMotel/UploadMotelImage";
import { Step } from "@/utils/interfaces";
import { Location } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  steps: Step[];
  currentStep: number;
  regular: object;
  location: Location | object;
  images: object;
  amenities: object;
  requirements: object;
  prices: object;
} = {
  steps: [
    {
      component: "",
      href: "/register-motel/regular",
      nextStepHref: "/register-motel/location",
    },

    {
      component: <RegularInfo />,
      href: "/register-motel/regular",
      nextStepHref: "/register-motel/location",
    },
    {
      component: <LocationInfo />,
      href: "/register-motel/regular",
      nextStepHref: "/register-motel/amenity",
    },
    {
      component: <AmenityInfo />,
      href: "/register-motel/amenity",
      nextStepHref: "/register-motel/images",
    },
    {
      component: <UploadMotelImage />,
      href: "/register-motel/images",
      nextStepHref: "/register-motel/prices",
    },
    {
      component: <PriceInfo />,
      href: "/register-motel/prices",
      nextStepHref: "/register-motel/requirements",
    },
    {
      component: <RequirementInfo />,
      href: "/register-motel/reuirements",
      nextStepHref: null,
    },
  ],
  currentStep: 2,
  regular: {},
  location: {},
  images: {},
  amenities: {},
  requirements: {},
  prices: {},
};

export const createMotelSlice = createSlice({
  name: "createMotel",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep === state.steps.length) state.currentStep = 0;
      else state.currentStep = state.currentStep + 1;
    },
    prevStep: (state) => {
      if (state.currentStep === 0) return;
      else state.currentStep = state.currentStep - 1;
    },
    setData: (state, action: PayloadAction) => {
      return {
        ...state,
        role: action.payload,
      };
    },
  },
});

export const { nextStep, setData, prevStep } = createMotelSlice.actions;
export default createMotelSlice.reducer;
