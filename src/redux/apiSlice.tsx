"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "@/types/Post";


export const apiSlice = createApi({
  reducerPath: "jsonData", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", 
  }),
  tagTypes: ["JsonData"], // tag helps updating the store by itself
  endpoints: (builder) => ({
    getDatas: builder.query<Post[], void>({
      query: () => `/posts`,
      providesTags: ["JsonData"],
    }),
    addData: builder.mutation<Post, Partial<Post>>({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["JsonData"],
    }),
    updateData: builder.mutation<Post, Partial<Post>>({
      query: (payload) => ({
        url: `/posts/${payload._id}`,
        method: "PUT",
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["JsonData"],
    }),
    deleteData: builder.mutation<Post, Partial<Post>>({
      query: (payload) => ({
        url: `/posts/${payload._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JsonData"],
    }),
  }),
});

export const {
  useGetDatasQuery,
  useAddDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
} = apiSlice;
