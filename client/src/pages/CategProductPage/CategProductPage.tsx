import { useEffect, useMemo, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { productI } from '../../features/product/types';
import useSearch from './hooks/useSearch';
import { useParams } from 'react-router';

const limit = 10;

export default function CategProductPage() {

  const { categ } = useParams();

  const { search, searchData, handleSearch, showNextMatchSearch } = useSearch({ limit, category: categ!, });
  
  const [data, setData] = useState<{
    products: productI[], index: number,
    currentPage: number, isNext: boolean
  }>({
  products: [],
  index: 0, 
  currentPage: 0,
  isNext:true,
  });

  const { products, index, currentPage, isNext } = data;


    const cards = useMemo(() => {
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [products])
  const cardsSearch = useMemo(() => {
      return searchData.products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [searchData])
  
  


  const list = search.trim() === '' ? cards : cardsSearch;
  const isMore = search ? searchData.isNext : isNext;
  const isSearch = search.trim() !== '';


  
  useEffect(() => {
    const replaceStateStr = (page:number, search:string) => {
      return  `?page=${page}&limit=10&search=${search}&next=${search ? searchData.index:index}`
    }

    history.replaceState(null,'',replaceStateStr(currentPage,search))
  
  },[data,searchData])

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => { 
    const params = { page : data.currentPage + 1, limit,category:categ}
  
  const res = await getProductsByCategories(params);
  if (res.ok) {
    const d = res.data;
    setData(data => ({...data,...d, products : [...data.products, ...d.products], currentPage : data.currentPage + 1}))
  
  }
};





  return (
    <>
      <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/>
      <div className={style.grid_template_columns}>
      {list}
      </div>
      {isMore && <button onClick={isSearch?showNextMatchSearch:getProducts}>neext</button>} 
  </>
  )
}
