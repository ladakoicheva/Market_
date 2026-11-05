import { useCallback, useEffect, useState } from "react";
import type { productI } from "../features/product/types";
import { debounce } from "../helpers/debounce";
import type { typeResponseAPI } from "../api/products";


const limit = 10;

 


type props = {
  getProductsAll: (params: Record<string, any>) => Promise<typeResponseAPI<{
    products: Record<string, any>, index?: number, isNext:boolean }>>,
  getProductsSearch?: ((query: Record<string, any>) => Promise<typeResponseAPI<{ products:productI[], index: number, isNext: boolean }>>),
  category?:string,
  search?:string,
}

export const useProducts = ({ getProductsAll, getProductsSearch, category ,search}:props) => {

  const getProductsBySearchDB = useCallback(debounce((query) => handleSearch(query)), []);

  const [isSearch, setIsSearch] = useState(false);

  const [searchData, setSearchData] = useState<{
    productsData: Record<string, any>[],
    index: number,
    isNext: boolean
  }>({
  productsData: [],
    index: 0,
  isNext:true,
  });

    const [data, setData] = useState<{
      productsData: Record<string, any>[], index: number,
      currentPage: number, isNext: boolean
    }>({
    productsData: [],
    index: 0, 
    currentPage: 0,
    isNext:true,
    });
  
  
 
  const isMore = isSearch ? searchData.isNext : data.isNext;
  
    const handleSearch = async (v : string) => {
   
  
      const query = { limit, next: 0, search: v, category }
      //@ts-ignore
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
     
    const query = { limit, next: searchData.index, search, category }
   //@ts-ignore
      const res = await getProductsSearch(query) ;
      
      if (res.ok) {
        setSearchData((prev)=>({...prev,...res.data, productsData:[...prev.productsData,...res.data.products]}))
        
      }
    }

 const getProducts = async () => { 
   const params = { page: data.currentPage + 1, limit } as Record<string,any>
   if(category) params.category = category
  
   const res = await getProductsAll(params);
  console.log(res)
  if (res.ok) {
    const d = res.data as Record<string,any>;

    console.log(d,'d')
    setData(data => ({...data,...d, productsData : [...data.productsData, ...d.products], currentPage : data.currentPage + 1}))
    console.log(res)
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









  