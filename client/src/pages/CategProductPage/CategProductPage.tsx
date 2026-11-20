import {  useMemo,  } from 'react'
import style from './CategProductPage.module.css'
import { getProductsByCategory } from '../../api/products';
import { getProductsByCategoryForSearch } from '../../api/search';
import ProductCard from '../../components/ProductCard/ProductCard';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import { useParams } from 'react-router';
import { useProducts } from '../../hooks/useProducts/useProducts';
import type { productI } from '../../features/product/types';



export default function CategProductPage() {
  // const [search, setSearch] = useState('');
  const { categ } = useParams();




  const { 
    products  : {  productsData }   ,
     getNext,
    isMore,
    deleteProduct
    
  } = useProducts< productI>({
    getProductsAll: getProductsByCategory,
    getProductsSearch: getProductsByCategoryForSearch,
    category: categ,
    // startSearch:searchValue!,

    
  });
  

  // const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value;
   
  //   setSearch(v);
  //   getProductsBySearchDB(v)

  
  // };
  
  


  const cards = useMemo(() => {
    const products = productsData ;
      return  products.map((p,index) => <ProductCard product={p} key={index} deleteItem={deleteProduct}  />)
    }, [productsData])
  
  
  
  return (
    <>
      <h1 className={style.category}>{categ}</h1>
      {/* <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/> */}
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      <ShowMoreButton isVisible={isMore} onClick={getNext} />
  </>
  )
}
