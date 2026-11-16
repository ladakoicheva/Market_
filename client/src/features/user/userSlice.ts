import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ModeType } from "./types";
import { registerUser } from "../../api/users";
import { login } from "../../api/users";
import { logout } from "../../api/users";
import { authorize } from "../../api/users";
import type { stateI } from "./types";
import type { AppDispatch } from "../../redux/store";
import { updateProductNoUser } from "../product/productSlice";
import { getUserProductData } from "../product/productSlice";
import type { userI } from "./types";
import type { SignInValues } from "../../components/SignInForm/types";
import type { SignUpValuesI } from "../../components/SignUpForm/types";



const initialState: stateI = {

  user: null,
  mode: ModeType.SIGN_UP,
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
  
    changeUserData: (state, action: PayloadAction<userI | null >) => {
      const data = action.payload;
      state.user = data;

      console.log('данные пользователя получили')
      
    },
    finishLoadingApp: (state) => {
      state.isLoadingApp = false;
        console.log('авторизация прошла')
    }
     
  }
})




export const register = createAsyncThunk<
  { ok: boolean; e?: string } ,//возвращаемое значение
  SignUpValuesI,//первый аргумент
  {dispatch:AppDispatch}//thunk config : dispatch,getState и тд
  >(
  'users/register',
  async (formData, { dispatch }) => {
    const res = await registerUser(formData);
    
    if (!res.ok) return { ok: false, e: res.e };

    dispatch(changeUserData(res.data.user ));
    localStorage.setItem('token', res.data.token);
  
     return {ok:true}
  }
);

export const loginUser = createAsyncThunk<
  { ok: boolean },
  SignInValues,
  {dispatch:AppDispatch,rejectValue:string}
  >(
  'users/login',
  async (formData, { dispatch ,rejectWithValue}) => {
    const res = await login(formData);

    if (!res.ok) return rejectWithValue(res.e !)
  
    
    dispatch(changeUserData(res.data.user ));
   
    localStorage.setItem('token', res.data.token);
    return {ok:true}
  }

);

export const logoutUser = createAsyncThunk<
  { ok: boolean; e?: string },
  void,
  {dispatch:AppDispatch}
  >(
  'users/logout',
  async (_, { dispatch }) => {
    const res = await logout();

    if (!res.ok) return { ok: false, e: res.e };

    dispatch(changeUserData(null));
   
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
      dispatch(changeUserData(res.data.user));
    
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
