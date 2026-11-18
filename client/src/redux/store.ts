import { configureStore } from "@reduxjs/toolkit";
import userReduser from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import searchReducer from "../features/search/search";

export const store = configureStore({
  reducer: {
    user: userReduser,
    productData: productReducer,
    search: searchReducer,
  
}
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







// start data 
// function for change data 

// get function in other places 
