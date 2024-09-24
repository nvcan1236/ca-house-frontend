import { caHouseBaseUrl } from "@/configs/APIconfig";
import { getToken } from "@/services/localStorageService";
import { IMotel, IMotelDetail, RegularCreate } from "@/utils/interfaces";
import { appointmentStatus } from "@/utils/predefinedData";
import {
  Amenity,
  ApiResponse,
  Appointment,
  Location,
  MotelStat,
  PageResult,
  Price,
  Requirement,
  Review,
  ReviewRequest,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Filter } from "../slices/filterSlice";

export const motelApi = createApi({
  reducerPath: "motelApi",
  baseQuery: fetchBaseQuery({ baseUrl: caHouseBaseUrl }),
  tagTypes: ["REVIEWS", "APPOINTMENT_STATUS"],
  endpoints: (builder) => ({
    getMotels: builder.query<
      ApiResponse<PageResult<IMotel>>,
      { page?: number; size?: number; filter: Filter }
    >({
      query: ({ page, size, filter }) => {
        const params = new URLSearchParams();
        const filterParam = new URLSearchParams();

        page && params.append("page", page.toString());
        size && params.append("size", size.toString());

        if (filter.applied) {
          filter.minPrice &&
            filterParam.append("minPrice", filter.minPrice.toString());
          filter.maxPrice &&
            filterParam.append("maxPrice", filter.maxPrice.toString());
          filter.roomType && filterParam.append("roomType", filter.roomType);
          filter.amenities.length &&
            filterParam.append("amenities", filter.amenities.join(","));
        }

        return {
          url: `/motel/?${params.toString()}&${
            filterParam.size > 0 ? filterParam.toString() : ""
          }`,
        };
      },
    }),
    getMotel: builder.query<ApiResponse<IMotelDetail>, string>({
      query: (id) => `/motel/${id}`,
    }),
    getMotelByUser: builder.query<ApiResponse<IMotel[]>, string>({
      query: (userId) => ({
        url: `/motel/owner/${userId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getNearestMotels: builder.query<
      ApiResponse<IMotel[]>,
      { lon: number; lat: number; radius: number }
    >({
      query: ({ lon, lat, radius }) => {
        const params = new URLSearchParams();
        if (lon) params.append("lon", lon.toString());
        if (lat) params.append("lat", lat.toString());
        if (radius) params.append("radius", radius.toString());
        return { url: `/motel/nearest?${params.toString()}` };
      },
    }),
    createRegularMotel: builder.mutation<ApiResponse<IMotel>, RegularCreate>({
      query: (data) => {
        return {
          url: `/motel/`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
    }),
    createLocationMotel: builder.mutation<
      ApiResponse<IMotel>,
      { motelId: string; data: Location }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/location`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
    }),
    createAmenityMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Amenity[] }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/amenity`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
    }),
    uploadImageyMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; images: FileList }
    >({
      query: ({ motelId, images }) => {
        const formData = new FormData();
        Array.from(images).forEach((image) => formData.append("images", image));
        return {
          url: `/motel/${motelId}/images`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: formData,
          method: "POST",
        };
      },
    }),
    createPriceMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Omit<Price, "units">[] }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/price`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
    }),
    createRequirementMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Requirement }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/requirement`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
    }),
    createReview: builder.mutation<
      ApiResponse<Review>,
      { data: ReviewRequest; motelId: string }
    >({
      query: ({ data, motelId }) => {
        return {
          url: `/motel/${motelId}/review`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["REVIEWS"],
    }),
    getReview: builder.query<ApiResponse<Review[]>, string>({
      query: (motelId) => ({
        url: `/motel/${motelId}/review`,
      }),
      providesTags: ["REVIEWS"],
    }),
    bookAppointment: builder.mutation<
      ApiResponse<unknown[]>,
      { motelId: string; date: string }
    >({
      query: ({ motelId, date }) => ({
        url: `/motel/${motelId}/appointment`,
        body: { date },
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getAppointmentByUser: builder.query<ApiResponse<Appointment[]>, void>({
      query: () => ({
        url: `/motel/appointment/user`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getAppointmentByMotelOwner: builder.query<ApiResponse<Appointment[]>, void>(
      {
        query: () => ({
          url: `/motel/appointment/owner`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),
        providesTags: ["APPOINTMENT_STATUS"],
      }
    ),
    changeStatus: builder.mutation<
      ApiResponse<unknown>,
      { appointmentId: string; status: keyof typeof appointmentStatus }
    >({
      query: ({ appointmentId, status }) => ({
        url: `/motel/appointment/${appointmentId}/update-status?status=${status}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        method: "PUT",
      }),
      invalidatesTags: ["APPOINTMENT_STATUS"],
    }),
    getMotelStat: builder.query<
      ApiResponse<MotelStat>,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/motel/stat?startDate=${startDate}&endDate=${endDate}&period=MONTH`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMotelsQuery,
  useGetMotelQuery,
  useGetMotelByUserQuery,
  useCreateRegularMotelMutation,
  useCreateAmenityMotelMutation,
  useCreateLocationMotelMutation,
  useCreatePriceMotelMutation,
  useCreateRequirementMotelMutation,
  useUploadImageyMotelMutation,
  useGetNearestMotelsQuery,
  useCreateReviewMutation,
  useGetReviewQuery,
  useBookAppointmentMutation,
  useGetAppointmentByUserQuery,
  useGetAppointmentByMotelOwnerQuery,
  useChangeStatusMutation,
  useGetMotelStatQuery
} = motelApi;
