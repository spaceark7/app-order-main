const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  isShown: false,
  table: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.isShown = action.payload
    },
    setTable: (state, action) => {
      state.table = action.payload
    },
    clearTable: (state) => {
      state.table = null
    },
  },
})

// create selectors
export const selectModal = (state) => state.modal.isShown
export const selectTable = (state) => state.modal.table

export const { setOpenModal, clearTable, setTable } = modalSlice.actions
export default modalSlice.reducer
