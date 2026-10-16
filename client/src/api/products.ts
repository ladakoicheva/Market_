import type { productI } from "../features/product/types";
const reqLink = import.meta.env.VITE_PRODUCTS_API_URL

type formData = Omit<productI, "owner" | "id">;
type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
type typeResponseGood<A> = { ok: true, data : A };
type typeResponseBad = { ok: false ,e?:string};
type headers = {
  'Content-Type': string,
  'Authorization'?:string
}
type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;


const productAPI = async < Response, T = undefined > (url: string| null, type :  typeReq = 'GET', body ? : null | T) : Promise<typeResponseAPI<Response>> => {
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
  

 
    
    const res= await response.json();
     if (!res.ok) return {ok : false, e:  res.e}

    return {ok : true, data:res.data}
  } catch (e) {
    const error = e instanceof Error ? e.message : (e as string);
    return {ok : false,e:error}
    }
} 


  export const addProduct = async (formValues:formData) => {
    const data = await productAPI<productI, formData>('add','POST',formValues);
    return data;
  }

  export const getUserProducts = async () => {
  const data = await productAPI<productI>('get', 'GET');
  return data;
  }

  export const getCategories = async () => {
  const data = await productAPI('categories', 'GET');
  return data;
  }

export const editProduct = async (product:productI) => {
  const data = await productAPI('edit', 'PATCH',product);
  return data;
  }