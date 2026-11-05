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
export type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;


const getQuery = (data: Record<string, any>) => {
  const query = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (value === null) return 
    query.set(key, String(value))
  })

  return query.toString() 
}



const productAPI = async < Response, T = undefined > (url: string = '', type :  typeReq = 'GET', body ? : null | T, params ? : Record<string, any>) : Promise<typeResponseAPI<Response>> => {
  try {
    const token = localStorage.getItem('token');
    const headers:headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = ` ${token}`
    const query = params ? '?' + getQuery(params) : ''
   
    
    const response = await fetch(`${reqLink}/${url}${query}`, {
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
  const data = await productAPI<productI[]>('get', 'GET');
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
  
export const getProductsByCategories = async (params : Record<string, any>) => {
  const data = await productAPI < { products: productI[], index: number, isNext:boolean }>('category', 'GET', null, params);
  return data
}

export const getProductsByCategSearch = async (params : Record<string, any>) => {
    const data = await productAPI < { products: productI[], index: number, isNext:boolean }>('search', 'GET', null,params);
  return data
}


export const getProductsSearch = async (params : Record<string, any>) => {
    const data = await productAPI < { products: productI[], index: number, isNext:boolean }>('search/all', 'GET', null,params);
  return data
}



export const getAllProducts = async (params : Record<string, any>) => {
    const data = await productAPI < { products: productI[], index: number, isNext:boolean }>('all', 'GET', null,params);
  return data
}

