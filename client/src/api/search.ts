import { apiRequest } from "./apiRequest";
import type { searchResult } from "./apiTypes";


const reqLink = import.meta.env.VITE_SEARCH_API_URL;



export const getProductsByCategoryForSearch = async (params: Record<string, any>) => {
  return apiRequest<searchResult>({ url: 'category', method: 'GET', params, baseUrl: reqLink });
}

export const getAllProductsForSearch = async (params: Record<string, any>) => {
  return apiRequest<searchResult>({ url: '', method:'GET',  params, baseUrl:reqLink });
}
