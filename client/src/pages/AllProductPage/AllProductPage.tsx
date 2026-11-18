import { useState } from "react";
import {  useMemo } from "react";
import { useProducts } from "../../hooks/useProducts/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import style from '../AllProductPage/AllProductPage.module.css'
import { getAllProducts } from "../../api/products";
import { getAllProductsForSearch } from "../../api/search";
import type { productI } from "../../features/product/types";
import FilterIcon from "../../icons/FilterIcon";
import FilterModal from "../../components/FilterModal/FilterModal";



export default function AllProductPage() {

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [search, setSearch] = useState('');
 

 const { 
    products : {  productsData } ,
    getNext,
    isMore,
  
   
  } = useProducts<productI>({
    getProductsAll: getAllProducts,
    getProductsSearch: getAllProductsForSearch,
    // search,
    
   

    
  });
  // useEffect(() => {
  //   getProductsBySearchDB(searchValue)
  
  // },[searchValue,getProductsBySearchDB])
  
 
  


  
 
    // const {  productsData } = products;

  const cards = useMemo(() => {
       const products = productsData ;
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [productsData])


  
  return (
    <>
      <div className={style.filter}>
        <div onClick={()=>setIsModalOpen(!isModalOpen)}><FilterIcon /></div>
        {isModalOpen && <FilterModal />}
      </div>

      {/* <input type="text" placeholder='Search...' value={search} onChange={handleSearch} /> */}
      
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      <ShowMoreButton isVisible={isMore} onClick={getNext} />
    </>
  
  )
}
