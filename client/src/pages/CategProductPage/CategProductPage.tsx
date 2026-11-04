import {  useMemo, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import { getProductsByCategSearch } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';

import { useParams } from 'react-router';
import { useProducts } from '../../hooks/useProducts';


export default function CategProductPage() {
  const [search, setSearch] = useState('');
  const { categ } = useParams();


  const { 
    products : {  productsData } ,
     getNext,
    getProductsBySearchDB,
    isMore,
    
  } = useProducts({
    getProductsAll: getProductsByCategories,
    getProductsSearch: getProductsByCategSearch,
    category: categ?categ:null,
    search,

    
  });
  

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
   
    setSearch(v);
    getProductsBySearchDB(v)

  
  };
  
  


    const cards = useMemo(() => {
      return  productsData.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [productsData])
  
  
  
  return (
    <>
      <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      {isMore && <button onClick={getNext}>neext</button>} 
  </>
  )
}
