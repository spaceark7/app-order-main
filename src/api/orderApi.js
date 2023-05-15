const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['orderApi'],
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
    }),
  }),
})

export const { useCreateOrderMutation, endpoints, reducer, middleware } =
  orderApi
