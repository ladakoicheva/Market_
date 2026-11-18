import type { typeResponseAPI } from "../../api/apiTypes";
import type { searchResult } from "../../api/apiTypes";


export enum ActionTypes {
  GET_PRODUCTS = 'get_products',
  GET_SEARCH = 'get_search',
  GET_NEXT_SEARCH = 'get_next_search',
}



export type props<T> = {
  getProductsAll: (params: Record<string, any>) => Promise<typeResponseAPI<searchResult<T>>>,
  getProductsSearch?: ((query: Record<string, any>) => Promise<typeResponseAPI<searchResult<T>>>),
  category?: string,
  startSearch?:string,
}
export interface searchDataI<T> {
  productsData: T[];
  index: number;
  isNext: boolean;
}

export interface productDataI<T> extends searchDataI<T> {
  currentPage: number;
}

export interface ReturnI<T> {
  products: searchDataI<T>|productDataI<T>,
  isMore: boolean,
   getNext: (() => Promise<void>) | (() => (v: string) => Promise<void>),
  getProductsBySearchDB: (query: any) => Promise<Promise<void>>
}

// products,
//     isMore,
//     getNext,
//     getProductsBySearchDB,

export interface state<T> {
  data: productDataI<T>
  searchData:searchDataI<T>
}