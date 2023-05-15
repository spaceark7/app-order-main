const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  isActive: false,
  menus: [],
  orderInfo: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.isActive = action.payload
    },
    setOrderInfo: (state, action) => {
      state.orderInfo = action.payload
    },
    resetOrderInfo: (state) => {
      state.orderInfo = null
      state.menus = []
      state.isActive = false
    },
    clearActiveOrder: (state) => {
      state.isActive = false
    },
    addMenu: (state, action) => {
      state.menus.push(action.payload)
    },
    removeMenu: (state, action) => {
      state.menus = state.menus.filter((menu) => menu.id !== action.payload)
    },
    incrementMenuQty: (state, action) => {
      const index = state.menus.findIndex((menu) => menu.id === action.payload)
      state.menus[index].qty += 1
    },
    decrementMenuQty: (state, action) => {
      const index = state.menus.findIndex((menu) => menu.id === action.payload)
      state.menus[index].qty -= 1
    },
  },
})

// create selectors
export const selectOrderStatus = (state) => state.order.isActive
export const selectAllMenu = (state) => state.order.menus
export const selectMenuById = (state, menuId) => {
  return state.order?.menus.find((menu) => menu.id === menuId) ?? null
}

export const {
  addMenu,
  clearActiveOrder,
  decrementMenuQty,
  incrementMenuQty,
  setOrderInfo,
  removeMenu,
  resetOrderInfo,
  setActiveOrder,
} = orderSlice.actions
export default orderSlice.reducer
