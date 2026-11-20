import type { productI } from "../features/product/types";
import { apiRequest } from "./apiRequest";
import  type { category } from "../features/product/types";
import type { searchResult } from "./apiTypes";
import type { productFormValues } from "../components/ProductForm/types";


const reqLink = import.meta.env.VITE_PRODUCTS_API_URL;


//! products all

export const getCategories = async () => {
  const data = await apiRequest<category[]>({ url:'categories', method:'GET' ,baseUrl:reqLink});
  return data;
}
  

export const getAllProducts = async (params: Record<string, any>) => {
    console.log(7)
  const data = await apiRequest<searchResult>({ url: '', method: 'GET', params, baseUrl: reqLink });
  return data
}

export const getProductsByCategory = async (params: Record<string, any>) => {
  const data = await apiRequest<searchResult>({ url: 'categories/products', method: 'GET', params, baseUrl: reqLink });
  return data;
}




//!product one


export const deleteProductOne =  async (id: number) => {
  console.log(7)
  const data = await apiRequest<productI>({ url: String(id), method: 'DELETE', baseUrl: reqLink });
  return data
}



export const createProductOne = async (formValues:productFormValues) => {
    const data = await apiRequest<productI, productFormValues>({ url:'', method:'POST', body:formValues ,baseUrl:reqLink});
    return data;
  }



export const editProductOne = async (product:productI) => {
  const data = await apiRequest<productI,productI>({ url: String(product.id), method: 'PATCH', body: product,baseUrl:reqLink });
  return data;
}
  


export const getProductOne = async (id: number) => {
    console.log(6)
  const data = await apiRequest<productI>({ url: String(id), method: 'GET', baseUrl:reqLink });
  return data
}