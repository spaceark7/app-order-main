import { createSlice } from '@reduxjs/toolkit'

// const getIPFromSecureStorage = async () => {
//   try {
//     const result = await SecureStore.getItemAsync('ip')
//     if (result) {
//       const ip = JSON.parse(result)
//       return ip
//     }
//   } catch (error) {
//     console.log('error:', error)
//   }
// }

// const getPortFromSecureStorage = async () => {
//   try {
//     const result = await SecureStore.getItemAsync('port')
//     if (result) {
//       const port = JSON.parse(result)
//       return port
//     }
//   } catch (error) {
//     console.log('error:', error)
//   }
// }

// const setIPToSecureStorage = async (ip) => {
//   try {
//     await SecureStore.setItemAsync('ip', JSON.stringify(ip))
//   } catch (error) {
//     console.log('error:', error)
//   }
// }

// const setPortToSecureStorage = async (port) => {
//   try {
//     await SecureStore.setItemAsync('port', JSON.stringify(port))
//   } catch (error) {
//     console.log('error:', error)
//   }
// }

const initialState = {
  ip: null,
  port: null,
}

const configSlice = createSlice({
  name: 'config',
  initialState,

  reducers: {
    setConfig: (state, action) => {
      state.ip = action.payload.ip
      state.port = action.payload.port
    },
    getConfig: (state) => {
      return state
    },
  },

  //   extraReducers: (builder) => {
  //     builder.addCase(getIPFromSecureStorage.fulfilled, (state, action) => {
  //       state.ip = action.payload
  //     })
  //     builder.addCase(getPortFromSecureStorage.fulfilled, (state, action) => {
  //       state.port = action.payload
  //     })

  //     builder.addCase(setIPToSecureStorage.fulfilled, (state, action) => {
  //       state.ip = action.payload
  //     })

  //     builder.addCase(setPortToSecureStorage.fulfilled, (state, action) => {
  //       state.port = action.payload
  //     })
  //   },
})

export const selectIP = (state) => state.config.ip
export const selectPort = (state) => state.config.port

export const { getConfig, setConfig } = configSlice.actions
export default configSlice.reducer
