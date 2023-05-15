const { base_url } = require('./api')
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { clearUser } from 'app/Auth/AuthSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['authApi'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: `${base_url}/login`,
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
      providesTags: ['authApi'],
    }),
    logout: builder.mutation({
      queryFn: (_, { dispatch }) => {
        dispatch(clearUser())
        return {
          data: 'logout',
        }
      },
      // invalidatesTags: ['authApi'],
      // onQueryStarted: (_, { dispatch }) => {
      //   dispatch(clearUser())
      // },
    }),
  }),
})

export const {
  useLoginMutation,
  endpoints,
  reducer,
  util,
  reducerPath,
  middleware,
  useLogoutMutation,
} = authApi
