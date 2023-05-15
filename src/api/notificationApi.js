import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { base_url } from './api'
import { setNotification } from 'app/Home/NotificationSlice'

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['notificationApi'],
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      queryFn: (_, { dispatch, getState }) => {
        dispatch(
          setNotification([
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
            {
              id: 1,
              title: 'title 1',
              content: 'content 1',
              isSeen: false,
            },
            {
              id: 2,
              title: 'title 2',
              content: 'content 2',
              isSeen: false,
            },
          ])
        )
        return {
          data: getState().notification.notifications,
        }
      },

      providesTags: ['notificationApi'],
    }),
    setSeen: builder.mutation({
      query: 'seen',

      invalidatesTags: ['notificationApi'],
    }),
  }),
})

export const { useGetNotificationsQuery, useSetSeenMutation } = notificationApi
