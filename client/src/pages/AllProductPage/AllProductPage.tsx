import { useState } from "react";
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import style from '../AllProductPage/AllProductPage.module.css'
import { getAllProducts } from "../../api/products";
import { getAllProductsForSearch } from "../../api/search";
import type { productI } from "../../features/product/types";
import FilterIcon from "../../icons/FilterIcon";
import FilterModal from "../../components/FilterModal/FilterModal";


export default function AllProductPage() {

  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [search, setSearch] = useState('');
 
const searchValue = searchParams.get('search')||"";

  useEffect(() => {
 
    
    
    getProductsBySearchDB(searchValue)
  
  },[searchValue])
  
  const { 
    products : {  productsData } ,
    getNext,
    getProductsBySearchDB,
    isMore,
  
   
  } = useProducts<productI>({
    getProductsAll: getAllProducts,
    getProductsSearch: getAllProductsForSearch,
    // search,
    search:searchValue!,
    category:null,

    
  });
  


  
 
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
