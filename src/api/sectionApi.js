const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getAuthToken } from 'app/Auth/AuthSlice'

export const sectionApi = createApi({
  reducerPath: 'sectionApi',
  tagTypes: ['sectionApi'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 1,
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    getSection: builder.query({
      query: () => ({
        url: `${base_url}/getAllTable`,
        method: 'GET',
      }),
      keepUnusedDataFor: 10,
      providesTags: ['sectionApi'],
      invalidatesTags: ['sectionApi'],
      transformResponse: (response) => {
        const sortedTable = response.sections.map((section) => {
          const sortedTable = section.tables.sort((a, b) => {
            return a.table_name.localeCompare(b.table_name)
          })
          return { ...section, tables: sortedTable }
        })

        return sortedTable
      },
      transformErrorResponse: (error) => {
        console.log('error response:', error)
        return error
      },
    }),
  }),
})

export const { useGetSectionQuery } = sectionApi
