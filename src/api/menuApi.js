const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const menuApi = createApi({
  reducerPath: 'menuApi',
  tagTypes: ['menuApi'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 1,
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: `${base_url}/items`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['menuApi'],
      invalidatesTags: ['menuApi'],
      transformResponse: (response) => {
        const sorted = response.groups.sort((a, b) => {
          if (a.menus.length === 0 && b.menus.length > 0) {
            return 1
          } else if (a.menus.length > 0 && b.menus.length === 0) {
            return -1
          } else {
            return 0
          }
        })
        return sorted
      },
    }),
  }),
})

export const { useGetMenuQuery } = menuApi
