import { useState } from "react";
import type { productI } from "../../../features/product/types";
import { getProductsBySearch } from "../../../api/products";
import { debounce } from "../../../helpers/debounce";



const getProductsBySearchDB = debounce((query) => getProductsBySearch(query));

export default function useSearch({limit,category}:{limit:number,category:string}) {

  
   const [search, setSearch] = useState('');
   const [searchData, setSearchData] = useState<{
    products: productI[], index: number,
    isNext: boolean
  }>({
  products: [],
  index: 0,
  isNext:true,
  });


  const handleSearch = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v.trim()) {
    setSearchData({ products: [], index: 0, isNext: true });
    return;
    }
    
    setSearch(v);

    const query = {limit, next :0, search : v, category}
    const res = await getProductsBySearchDB(query)
   
      if (res.ok) {
        const { index, products } = res.data;
     
        setSearchData({
            products: products,
            index: index, 
            isNext:true
        })
      }
  }


  const showNextMatchSearch = async () => {
     
   const query = {limit, next : searchData.index  , search ,category}
      const res = await getProductsBySearch(query);
      
      if (res.ok) {
        setSearchData((prev)=>({...prev,...res.data, products:[...prev.products,...res.data.products]}))
        
      }
    }



  return (
    {
      search,
      searchData,
      handleSearch,
      showNextMatchSearch,

    }
  )
}
