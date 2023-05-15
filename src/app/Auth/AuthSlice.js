import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }) => {
//     const response = await authApi.endpoints.login({ email, password }).unwrap()
//     return response.data
//   }
// )

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    clearUser: (state) => {
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    getAuthToken: (state) => {
      return state.user?.token
    },
  },
})

export const selectUser = (state) => state.auth.user
export const getToken = (state) => state.auth.token

export const { setUser, clearUser, getAuthToken } = authSlice.actions
export default authSlice.reducer
