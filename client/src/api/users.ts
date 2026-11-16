import type { userI } from "../features/user/types";
import type { productI } from "../features/product/types";
import { apiRequest } from "./apiRequest";
import type { SignInValues } from "../components/SignInForm/types";
import type { SignUpValuesI } from "../components/SignUpForm/types";


const reqLink = import.meta.env.VITE_USER_API_URL


  

export const registerUser = async(formData: SignUpValuesI) => {
  const data = await apiRequest<{ token: string, user: userI }, SignUpValuesI>({ url: 'register', method: 'POST', body: formData, baseUrl: reqLink });
  return data
}


export const login = async (formData: SignInValues) => {
  const data = await apiRequest<{ token: string, user: userI }, SignInValues>({ url: 'login', method: 'POST', body: formData, baseUrl: reqLink });
  return data
}

export const logout  =  async () => {
  
  const data = await apiRequest<null>({ url: 'logout', method: 'GET' ,baseUrl:reqLink});

  return data
}


export const authorize =  async () => {
  
  const data = await apiRequest<{ token: string, user: userI }>({ url: 'me', method: 'GET', baseUrl: reqLink });

  return data
}

export const getUserProducts = async () => {
  const data = await apiRequest<productI[]>({ url: 'me/products', method: 'GET', baseUrl: reqLink });
  return data;
}