import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Client,
  ClientsResponse,
  ClientCreate,
  ClientUpdate,
} from "@interfaces/client.interface";
import { BASE_URL } from "@config/env.config";

export const ClientApi = createApi({
  reducerPath: "ClientApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/user` }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getClients: builder.query<
      ClientsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }: { page?: number; limit?: number }) =>
        page ? `?page=${page}&limit=${limit}` : ``,
      providesTags: ["Client"],
    }),
    getClient: builder.query<Client, string>({
      query: (id: string) => `/${id}`,
      providesTags: ["Client"],
    }),
    addClient: builder.mutation<Client, ClientCreate>({
      query: (client) => ({
        url: "/",
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation<Client, ClientUpdate>({
      query: (client) => ({
        url: `${client.id}`,
        method: "PUT",
        body: client,
      }),
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientQuery,
} = ClientApi;
