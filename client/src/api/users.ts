import type { userI } from "../features/user/types";
const reqLink = import.meta.env.VITE_USER_API_URL

type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
type typeResponseGood<A> = { ok: true, data : A };
type typeResponseBad = { ok: false ,e?:string};
type headers = {
  'Content-Type': string,
  'Authorization'?:string
}
type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;


const usersAPI = async < Response, T = undefined > (url: string| null, type :  typeReq = 'GET', body ? : null | T) : Promise<typeResponseAPI<Response>> => {
  try {
    const token = localStorage.getItem('token');
    const headers:headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization']= ` ${token}`
    
    const response = await fetch(url ? `${reqLink}/${url}` : reqLink, {
      method: type,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  

  
    
    const res = await response.json();
     if (!res.ok) return {ok : false, e:  res.e}

    return {ok : true, data:res.data}
  } catch (e) {
    const error = e instanceof Error ? e.message : (e as string);
    return {ok : false,e:error}
    }
} 
  

export const registerUser = async(formData: { confirmPassword: string, password: string, email: string }) => {
  const data = await usersAPI < userI,{ confirmPassword: string, password: string, email: string }>('register', 'POST', formData);
  return data
}


export const login = async (formData: { password: string, email: string }) => {

  const data = await usersAPI<userI, { password: string, email: string}>('login', 'POST', formData);

  return data
}

export const logout  =  async () => {
  
  const data = await usersAPI<userI>('logout', 'GET');

  return data
}


export const authorize =  async () => {
  
  const data = await usersAPI<userI>('authorization', 'GET');

  return data
}