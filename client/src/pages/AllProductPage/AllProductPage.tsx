import Category from "../../components/Category/Categories";
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import style from '../AllProductPage/AllProductPage.module.css'
import { getAllProducts } from "../../api/products";
import { getProductsSearch } from "../../api/products";
import type { productI } from "../../features/product/types";


export default function AllProductPage() {

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
    products : {  productsData } ,
    getNext,
    getProductsBySearchDB,
    isMore,
  
   
  } = useProducts({
    getProductsAll: getAllProducts,
    getProductsSearch: getProductsSearch,
    // search,
    search:searchValue!,
    category:null,

    
  });
  


  
 
    // const {  productsData } = products;

  const cards = useMemo(() => {
       const products = productsData as productI[];
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [productsData])



   
 
  
  
  return (
    <>
 
      {/* <input type="text" placeholder='Search...' value={search} onChange={handleSearch} /> */}
         <Category/>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      <ShowMoreButton isVisible={isMore} onClick={getNext} />
    </>
  
  )
}
