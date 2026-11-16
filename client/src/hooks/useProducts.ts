import { useCallback, useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";
import type { typeResponseAPI } from "../api/apiTypes";
import type { searchResult } from "../api/apiTypes";


const limit = 10;

 


type props<T> = {
  getProductsAll: (params: Record<string, any>) => Promise<typeResponseAPI<searchResult<T>>>,
  getProductsSearch?: ((query: Record<string, any>) => Promise<typeResponseAPI<searchResult<T>>>),
  category?: string|null,
  search?:string,
}

export const useProducts = <T>({ getProductsAll, getProductsSearch, category ,search}:props<T>) => {

  const getProductsBySearchDB = useCallback(debounce((query) => handleSearch(query)), []);

  const [isSearch, setIsSearch] = useState(false);

  const [searchData, setSearchData] = useState<{
    productsData: T[],
    index: number,
    isNext: boolean
  }>({
  productsData: [],
    index: 0,
  isNext:true,
  });

 
    const [data, setData] = useState<{
      productsData: T[], index: number,
      currentPage: number, isNext: boolean
    }>({
    productsData: [],
    index: 0, 
    currentPage: 0,
    isNext:true,
    });
  
  
 
  const isMore = isSearch ? searchData.isNext : data.isNext;
  
  const handleSearch = async (v: string) => {
      if(!getProductsSearch) return
      if (v.trim() === '') {
        
        setIsSearch(false);
        return
      };
      const query = { limit, next: 0, search: v, category }
      
      const res = await  getProductsSearch(query)
        setIsSearch(v.trim() !== '')
      if (res.ok) {
        const { index, products,isNext } = res.data;
       
        setSearchData({
          productsData: products,
          index: index,
          isNext
        })
      }
    };
  const showNextMatchSearch = async () => {
     
    if(!getProductsSearch) return
    const query = { limit, next: searchData.index, search, category }
  
    const res = await getProductsSearch(query);
      
      if (res.ok) {
        setSearchData((prev)=>({...prev,...res.data, productsData:[...prev.productsData,...res.data.products]}))
        
      }
    }

 const getProducts = async () => { 
   const params = { page: data.currentPage + 1, limit } as Record<string,any>
   if(category) params.category = category
  
   const res = await getProductsAll(params);
 
  if (res.ok) {
    const d = res.data 

    setData(data => ({...data,...d, productsData : [...data.productsData, ...d.products], currentPage : data.currentPage + 1}))
 
  }
};
    useEffect(() => {
      getProducts();
      
  

    }, []);
  
  useEffect(() => {
    history.replaceState(null,'',`?page=${data.currentPage}&index=${isSearch?searchData.index:data.index}`)
  },[data,searchData,isSearch])
  
const getNext = isSearch?showNextMatchSearch:getProducts
 
  
const products = isSearch ? searchData : data
  
  return {
    products,
    isMore,
    getNext,
    getProductsBySearchDB,
   
  }
}









  