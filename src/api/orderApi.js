const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['orderApi', 'orderDetail', 'addOrder'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({
        sales_date,
        table_id,
        guest_name,
        guest_no,
        device_name,
        order_detail,
      }) => ({
        url: `${base_url}/order`,
        method: 'POST',
        body: {
          sales_date,
          table_id,
          guest_name,
          guest_no,
          device_name,
          order_detail,
        },
      }),
      providesTags: ['orderApi'],
      invalidatesTags: ['orderApi', 'orderDetail'],
    }),
    getOrderdetail: builder.query({
      query: ({ table_name, device_name }) => ({
        url: `${base_url}/cektable`,
        method: 'POST',
        body: {
          table_name,
          device_name,
        },
      }),
      providesTags: ['orderDetail'],
      invalidatesTags: ['orderDetail'],
    }),
    addNewOrder: builder.mutation({
      query: ({ sales_date, table_id, device_name, order_detail }) => ({
        url: `${base_url}/addorder`,
        method: 'POST',
        body: {
          sales_date,
          table_id,
          device_name,
          order_detail,
        },
      }),
      providesTags: ['addOrder'],
      invalidatesTags: ['orderApi', 'orderDetail'],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  endpoints,
  reducer,
  middleware,
  useAddNewOrderMutation,
  useGetOrderdetailQuery,
} = orderApi
