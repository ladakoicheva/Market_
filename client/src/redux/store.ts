import { configureStore } from "@reduxjs/toolkit";
import userReduser from '../features/user/userSlice';
import productReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    user: userReduser,
    productData: productReducer,
}
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;