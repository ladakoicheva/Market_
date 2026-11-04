import type { productI } from "../features/product/types";

const reqLink = import.meta.env.VITE_HISTORY_API_URL;

 interface orderI {
  date: string;
  owner: string;
  products: productI[];
 }
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



const historyAPI = async < Response, T = undefined > (url: string = '', type :  typeReq = 'GET', body ? : null | T, params ? : Record<string, any>) : Promise<typeResponseAPI<Response>> => {
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


export const addToHistory = async (purchase:Omit<orderI,'date'>) => {
  const data = await historyAPI<orderI, typeof purchase>('add','POST',purchase);
      
  return data;
}

export const getHistory = async (params : Record<string, any>) => {
  const data = await historyAPI<{ history: orderI[], isNext:boolean }>('get','GET',null,params);
     
  return data;
}