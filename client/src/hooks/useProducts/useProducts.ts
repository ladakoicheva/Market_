import { useCallback, useEffect } from "react";
import { debounce } from "../../helpers/debounce";
import { useAppSelector } from "../../redux/hooks";
import { useReducer } from "react";
import type { props, state, ReturnI } from "./types";
import { ActionTypes } from "./types";
import type { searchResult } from "../../api/apiTypes";


const limit = 10;



    // setData(data => ({...data,...d, productsData : [...data.productsData, ...d.products], currentPage : data.currentPage + 1}))
        // setSearchData((prev)=>({...prev,...res.data, productsData:[...prev.productsData,...res.data.products]})

export const setUrlForProducts = (page: number, index: number,search:string) => {
  let link = `?page=${page}&index=${index}`
  if(search.trim()) link += `&text=${search}`
  history.replaceState(null,'', link)
}

export const useProducts = <T>({ getProductsAll, getProductsSearch, category}:props<T>):ReturnI<T> => {

  const getProductsBySearchDB = useCallback(debounce((query) => handleSearch(query)), []);
  const { search } = useAppSelector((s) => s.search);
  const isSearch = search.trim() !== '';


  const getProducts = async () => { 
   const params = { page: data.currentPage + 1, limit } as Record<string,any>
   if(category) params.category = category
  
   const res = await getProductsAll(params);
 
  if (res.ok) dispatch({type:ActionTypes.GET_PRODUCTS, payload: res.data})
};
  const reducer = (state: state<T>, action: { type: ActionTypes, payload: searchResult<T>}) => {
    switch (action.type) {
      case ActionTypes.GET_PRODUCTS:
        return {
          ...state,
          data: {
            ...state.data,
            ...action.payload,
            productsData: [...state.data.productsData, ...action.payload.products],
            currentPage: state.data.currentPage + 1
          },
     
        }
      case ActionTypes.GET_SEARCH:
        return {
          ...state,
          searchData: {
            ...state.searchData,
            ...action.payload,
            productsData:  action.payload.products,
          
          },

        }
      case ActionTypes.GET_NEXT_SEARCH:
        return {
           ...state,
          searchData: {
            ...state.searchData,
            ...action.payload,
            productsData: [...state.searchData.productsData, ...action.payload.products],
          },
        }
    
      default:
        throw Error('Unknown action.');
    }
  };

  
const [state, dispatch] = useReducer(reducer, {
    data:{
    productsData: [],
    index: 0,
    isNext: true,
    currentPage: 0,
    },
    searchData: {
    productsData: [],
    index: 0,
    isNext:true,
    }

});
  
  
  
const { data, searchData } = state;
const getNext = isSearch ? ()=>handleSearch(search,ActionTypes.GET_NEXT_SEARCH) : getProducts;
const products = isSearch ? searchData : data
const isMore = isSearch ? searchData.isNext : data.isNext;
  
  const handleSearch = async (v: string,type=ActionTypes.GET_SEARCH) => {
      if(!getProductsSearch) return
    
    
      const query = { limit, next: searchData.index, search: v, category }
     const res = await getProductsSearch(query)
      if (res.ok)dispatch({type, payload: res.data})
    };




useEffect(() => {getProducts()}, []);

useEffect(() => {
    const page =   data.currentPage;
    const index = search ? searchData.index : data.index;
    setUrlForProducts(page, index, search)
}, [data.currentPage, data.index, searchData.index, search]);
  
  
  useEffect(() => { getProductsBySearchDB(search)},[search])
    
return {
    products,
    isMore,
    getNext,
    getProductsBySearchDB,
   
  }
}









  