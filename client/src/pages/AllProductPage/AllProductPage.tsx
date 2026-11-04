import Category from "../../components/Category/Categories";
import { useState } from "react";
import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from '../CategProductPage/AllProductPage.module.css'
import { getAllProducts } from "../../api/products";
import { getProductsSearch } from "../../api/products";


export default function AllProductPage() {

    const [search, setSearch] = useState('');
  const { 
    products : {  productsData } ,
    getNext,
    getProductsBySearchDB,
    isMore,
   
  } = useProducts({
    getProductsAll: getAllProducts,
    getProductsSearch: getProductsSearch,
    search,
    category:null,

    
  });
  

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
   
    
    setSearch(v);
    getProductsBySearchDB(v)

  
  };
  
 
    // const {  productsData } = products;

    const cards = useMemo(() => {
      return productsData.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [productsData])



   
 
  
  
  return (
    <>
 
      <input type="text" placeholder='Search...' value={search} onChange={handleSearch} />
         <Category/>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      {isMore && <button onClick={getNext}>neext</button>} 
    </>
  
  )
}
