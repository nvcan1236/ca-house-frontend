import { caHouseBaseUrl } from "@/configs/APIconfig";
import { getToken } from "@/services/localStorageService";
import {
  IComment,
  ICommentCreate,
  IMotelDetail,
  IPost,
  IPostCreate,
} from "@/utils/interfaces";
import { reactions } from "@/utils/predefinedData";
import { ApiResponse } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: caHouseBaseUrl }),
  tagTypes: ["POSTS", "COMMENTS"],
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<IPost[]>, void>({
      query: () => ({
        url: `/post/`,
        headers: {
          ...(getToken() !== null && {
            Authorization: `Bearer ${getToken()}`,
          }),
        },
      }),
      providesTags: ["POSTS"],
    }),
    getPost: builder.query<ApiResponse<IMotelDetail>, string>({
      query: (id) => `/post/${id}`,
    }),
    react: builder.mutation<
      ApiResponse<string>,
      { postId: string; type: keyof typeof reactions | null }
    >({
      query({ postId, type }) {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        return {
          url: `post/${postId}/react?${params.toString()}`,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          method: "POST",
        };
      },
      invalidatesTags: ["POSTS"],
    }),
    createPost: builder.mutation<ApiResponse<IPost>, IPostCreate>({
      query: (data) => {
        const token = getToken();
        return {
          url: `/post/`,
          body: data,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["COMMENTS", "POSTS"],
    }),
    getComments: builder.query<ApiResponse<IComment[]>, string>({
      query: (postId) => `/post/${postId}/comment`,
      providesTags: ["COMMENTS"],
    }),
    postComment: builder.mutation<
      ApiResponse<IComment>,
      { postId: string; comment: ICommentCreate }
    >({
      query: ({ postId, comment }) => {
        const token = getToken();
        return {
          url: `/post/${postId}/comment`,
          body: comment,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["COMMENTS", "POSTS"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useReactMutation,
  useGetCommentsQuery,
  usePostCommentMutation,
} = postApi;
