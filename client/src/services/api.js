import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (registerData) => ({
        url: "/auth/registration",
        method: "POST",
        body: registerData,
      }),
    }),
    login: build.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    getProfile: build.query({
      query: () => "/auth/profile",
    }),
    getProjectList: build.query({
      query: () => "/project/list",
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useGetProfileQuery, useGetProjectListQuery } =
  apiService;
