const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  notifications: [1, 2, 3, 4, 5],
  isSeen: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications = action.payload
    },
    setIsSeen: (state, action) => {
      state.isSeen = action.payload
    },
  },
})

export const { setNotification, setIsSeen } = notificationSlice.actions
export default notificationSlice.reducer
