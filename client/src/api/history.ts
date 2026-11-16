import { apiRequest } from "./apiRequest";
import type { searchResult } from "./apiTypes";
import type { historyI, newHistoryI } from "../features/history/types";


const reqLink = import.meta.env.VITE_HISTORY_API_URL;

export const addToHistory = async (purchase: newHistoryI) => {
  const data = await apiRequest<historyI, newHistoryI>({ url: '', method: 'POST', body: purchase ,baseUrl:reqLink});
      
  return data;
}

export const getHistory = async (params : Record<string, any>) => {
  const data = await apiRequest<searchResult<historyI>>({ url: '', method: 'GET', params, baseUrl: reqLink });
     
  return data;
}


export const getHistoryItem = async (id: string) => {
  
  const data = await apiRequest<historyI>({ url: id, method: 'GET',baseUrl:reqLink });
  
  return data;
}