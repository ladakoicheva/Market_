import {  useMemo,  } from 'react'
import style from './CategProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import { getProductsByCategSearch } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useParams } from 'react-router';
import { useProducts } from '../../hooks/useProducts';
import type { productI } from '../../features/product/types';


export default function CategProductPage() {
  // const [search, setSearch] = useState('');
  const { categ } = useParams();
const [searchParams] = useSearchParams();
  // const [search, setSearch] = useState('');
 
const searchValue = searchParams.get('search')||"";

  useEffect(() => {
      
      const handleSearch = async () => {
    // const v = e.target.value;
   
    
    // setSearch(v);
    getProductsBySearchDB(searchValue)

  
      };
    handleSearch()
  },[searchValue])
  

  const { 
    products  : {  productsData }   ,
     getNext,
    getProductsBySearchDB,
    isMore,
    
  } = useProducts({
    getProductsAll: getProductsByCategories,
    getProductsSearch: getProductsByCategSearch,
    category: categ?categ:null,
    search:searchValue!,

    
  });
  

  // const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value;
   
  //   setSearch(v);
  //   getProductsBySearchDB(v)

  
  // };
  
  


  const cards = useMemo(() => {
    const products = productsData as productI[];
      return  products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [productsData])
  
  
  
  return (
    <>
      {/* <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/> */}
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      <ShowMoreButton isVisible={isMore} onClick={getNext} />
  </>
  )
}
