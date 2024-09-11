import { caHouseBaseUrl } from "@/configs/APIconfig";
import { IMotel, IMotelDetail } from "@/utils/interfaces";
import { ApiResponse, PageResult } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const motelApi = createApi({
  reducerPath: "motelApi",
  baseQuery: fetchBaseQuery({ baseUrl: caHouseBaseUrl }),
  endpoints: (builder) => ({
    getMotels: builder.query<
      ApiResponse<PageResult<IMotel>>,
      { page?: number; size?: number }
    >({
      query: ({page, size}) => {
        const params = new URLSearchParams();
        if (page) {
          params.append('page', page.toString());
        }
    
        if (size) {
          params.append('size', size.toString());
        }
        return {
          url: `/motel/?${params.toString()}`,
        };
      },
    }),
    getMotel: builder.query<ApiResponse<IMotelDetail>, string>({
      query: (id) => `/motel/${id}`,
    }),
  }),
});

export const { useGetMotelsQuery, useGetMotelQuery } = motelApi;
