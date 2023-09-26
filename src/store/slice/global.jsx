import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    mode: 'dark',
    allCategories: [],
    nestedCategories: [],
    badges: [],
    ingredients: [],
    faqs: [],
    products: [],
  },
  reducers: {
    changeTheme(state, action) {
      state.mode = action.payload
    },
    setAllValues(state, action) {
      state.badges = action.payload.badges
      state.ingredients = action.payload.ingredients
      state.faqs = action.payload.faqs
      state.nestedCategories = action.payload.nestedCategories
      state.allCategories = action.payload.allCategories
      state.products = action.payload.products
    },
    setNestedCategories(state, action) {
      state.nestedCategories = action.payload
    },
  },
})

export const { changeTheme, setAllValues, setNestedCategories } = globalSlice.actions

export const globalReducer = globalSlice.reducer
