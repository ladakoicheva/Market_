
import { getQuery } from "./utils/getQuery";
import  type { typeReq ,typeResponseAPI} from "./apiTypes";


export interface ApiRequestOptions<T> {
  url?: string;
  method?: typeReq;
  baseUrl: string;
  body?: null | T;
  params?: Record<string, any>;
}


export const apiRequest = async <Response, T = undefined>({
  url = '',
  method = 'GET',
  baseUrl,
  body,
  params,
}: ApiRequestOptions<T>): Promise<typeResponseAPI<Response>> => {
  try {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers.Authorization = ` ${token}`
    const query = params ? '?' + getQuery(params) : ''
   
    
    const response = await fetch(`${baseUrl}/${url}${query}`, {
      method,
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
