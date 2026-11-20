import { useCallback, useEffect } from "react";
import { debounce } from "../../helpers/debounce";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useReducer } from "react";
import type { props, stateI, ReturnI } from "./types";
import { ActionTypes } from "./types";
import { setUrlForProducts } from "./helpers";
import { reducer } from './logic';
import { deleteProductOneData } from "../../features/product/productSlice";


const limit = 10;



// setData(data => ({...data,...d, productsData : [...data.productsData, ...d.products], currentPage : data.currentPage + 1}))
// setSearchData((prev)=>({...prev,...res.data, productsData:[...prev.productsData,...res.data.products]})






const initialState = {
  data: {
    productsData: [],
    index: 0,
    isNext: true,
    currentPage: 0,
  },
  searchData: {
    productsData: [],
    index: 0,
    isNext: true,
  },
};


export const useProducts = <T, >({ getProductsAll, getProductsSearch, category }: props<T>): ReturnI<T> => {

  const { search } = useAppSelector((s) => s.search);
  const [state, dispatch] = useReducer(reducer<T>, initialState as stateI<T>);
  const dispatchRedux = useAppDispatch()

  const isSearch = search.trim() !== '';
  const { data, searchData } = state;
  const products = isSearch ? searchData : data
  const isMore = isSearch ? searchData.isNext : data.isNext;

  const getProducts = async () => {
    const params = { page: data.currentPage + 1, limit } as Record<string, any>
    if (category) params.category = category

    const res = await getProductsAll(params);

    if (res.ok) dispatch({ type: ActionTypes.GET_PRODUCTS, payload: res.data })
  };
  const getProductsBySearchDB = useCallback(debounce((query) => handleSearch(query)), []);
  const getNext = isSearch ? () => handleSearch(search, ActionTypes.GET_NEXT_SEARCH) : getProducts;
  const handleSearch = async (v: string, type = ActionTypes.GET_SEARCH) => {
    if (!getProductsSearch) return


    const query = { limit, next: searchData.index, search: v, category }
    const res = await getProductsSearch(query)
    if (res.ok) dispatch({ type, payload: res.data })
  };
  const deleteProduct = async(id:number) => {
    const res = await dispatchRedux(deleteProductOneData(id)).unwrap();
    if (res.ok) dispatch({ type: ActionTypes.DELETE_PRODUCT ,payload:id});
  }

  useEffect(() => { getProducts() }, []);
  useEffect(() => { getProductsBySearchDB(search) }, [search])
  useEffect(() => {
    const page = data.currentPage;
    const index = search ? searchData.index : data.index;
    setUrlForProducts(page, index, search)
  }, [data.currentPage, data.index, searchData.index, search]);


  return {
    products,
    isMore,
    deleteProduct,
    getNext,
    getProductsBySearchDB,

  }
}









