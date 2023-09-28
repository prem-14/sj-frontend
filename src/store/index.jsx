import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { alertReducer } from './slice/alert'
import { authReducer } from './slice/auth'
import { dummyReducer } from './slice/dummy'
import { productReducer } from './slice/product'
import { globalReducer } from './slice/global'
import { authsApi } from './apis/authApis'
import { usersApi } from './apis/usersApi'
import { packagesApi } from './apis/packagesApi'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    alert: alertReducer,
    auth: authReducer,
    product: productReducer,
    dummy: dummyReducer,
    [authsApi.reducerPath]: authsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [packagesApi.reducerPath]: packagesApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authsApi.middleware).concat(usersApi.middleware).concat(packagesApi.middleware)
  },
})

setupListeners(store.dispatch)

export default store
