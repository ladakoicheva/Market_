import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ModeType } from "./types";
import { registerUser } from "../../api/users";
import { login } from "../../api/users";
import { logout } from "../../api/users";
import { authorize } from "../../api/users";
import type { stateI } from "./types";
import type { AppDispatch } from "../../redux/store";
import { updateProductNoUser } from "../product/productSlice";
import { getUserProductData } from "../product/productSlice";
import { getCategoriesData } from "../product/productSlice";

const initialState: stateI = {

  user: null,
  mode: ModeType.SIGN_UP,
  isAuth: false,
  isLoadingApp: true
  
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeModeSignUp: (state) => {
      state.mode = ModeType.SIGN_UP;
    },
    changeModeSignIn: (state) => {
       state.mode = ModeType.SIGN_IN;
    },
    changeAuthFalse: (state) => {
      state.isAuth = false;
    },
     changeAuthTrue: (state) => {
      state.isAuth = true;
    },
    changeUserData: (state, action) => {
      const data =action.payload
      state.user = data;
      state.isAuth = Boolean(data);
      console.log('данные пользователя получили')
      
    },
    finishLoadingApp: (state) => {
      state.isLoadingApp = false;
        console.log('авторизация прошла')
    }
     
  }
})




export const register = createAsyncThunk<
  { ok: Boolean } ,//возвращаемое значение
  { confirmPassword: string, password: string, email: string },//первый аргумент 
  {dispatch:AppDispatch}//thunk config : dispatch,getState и тд
  >(
  'users/register',
  async (formData, { dispatch }) => {
    const res = await registerUser(formData);
    
    if (!res.ok) return { ok: false, e: res.e };

    const data = { email: res.data.email, id: res.data.id ,role:res.data.role}
    dispatch(changeUserData(data));
    localStorage.setItem('token', res.data.token);
  
     return {ok:true}
  }
);

export const loginUser = createAsyncThunk<
  { ok: Boolean },
  {password: string, email: string },
  {dispatch:AppDispatch,rejectValue:String}
  >(
  'users/login',
  async (formData, { dispatch ,rejectWithValue}) => {
    const res = await login(formData);

    if (!res.ok) return rejectWithValue(res.e !)
  
    
    dispatch(changeUserData(res.data));
    console.log(res.data.token)
    localStorage.setItem('token', res.data.token);
    return {ok:true}
  }

);

export const logoutUser = createAsyncThunk<
  { ok: Boolean },
  void,
  {dispatch:AppDispatch}
  >(
  'users/logout',
  async (_, { dispatch }) => {
    const res = await logout();

    if (!res.ok) return { ok: false, e: res.e };

    dispatch(changeUserData(null));
    console.log(res.data.token)
    localStorage.removeItem('token');
    return { ok: true };
  }

);

export const authorizeUser = createAsyncThunk<
  { ok: boolean }, 
  void,
  { dispatch: AppDispatch; rejectValue: { ok: boolean; e: string } }
>(
  'users/auth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await authorize();
     
      if (!res.ok) {
        dispatch(changeUserData(null));
        dispatch(updateProductNoUser());

        return rejectWithValue({
          ok: false,
          e:res.e as string ,
        });
      }
      dispatch(getUserProductData());
      dispatch(changeUserData(res.data));
      dispatch(getCategoriesData());
      
      return { ok: true };
    } catch (error) {
   
      const errorMessage = error as any;
      return rejectWithValue({
        ok: false,
        e: errorMessage,
      });
    } finally {
  
      dispatch(finishLoadingApp());
    }
  }
);


export default userSlice.reducer;
export const { changeModeSignUp, changeModeSignIn,changeUserData,finishLoadingApp } = userSlice.actions;
