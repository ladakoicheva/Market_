import { useEffect, useMemo, useRef, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { productI } from '../../features/product/types';
import { getProductsBySearch } from '../../api/products';
import { useParams } from 'react-router';
import { debounce } from '../../helpers/debounce';


const limit = 10
const getProductsBySearchDB = debounce((query) => getProductsBySearch(query));





export default function CategProductPage() {
  const { categ } = useParams();
 
  const [search, setSearch] = useState('');
  const [data, setData] = useState<{
    products: productI[], index: number,
    currentPage: number, isNext: boolean
  }>({
  products: [],
  index: 0, 
  currentPage: 0,
  isNext:true,
  });

  const [searchData, setSearchData] = useState<{
    products: productI[], index: number,
    isNext: boolean
  }>({
  products: [],
  index: 0,
  isNext:true,
  });


  const { products,  index, currentPage,isNext } = data;
  const timeOutID = useRef<number|null>(null)

  console.log(search,index)

  //для пагинации
  useEffect(() => {
    history.replaceState(null, "", `?page=${currentPage}&limit=10&search=${search}&next=${search ? searchData.index:index}`);
  },[data,searchData])

  const handleSearch = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setSearch(v);
  //   if (timeOutID.current) {
  //     clearTimeout(timeOutID.current);
  //     timeOutID.current = null
  // }

  //   timeOutID.current = setTimeout(async () => {
      const query = {limit, next :0, search : v, category:categ}
    const res = await getProductsBySearchDB(query)
    console.log(res)
      
      if (res.ok) {
        const { index, products } = res.data;
     // setSearchData((prev)=>({...prev,...res.data, products:[...res.data.products]}))
        setSearchData({
            products: products,
            index: index, 
            isNext:true
        })
      // setSearchData((prev)=>({...prev,...res.data, products:[...res.data.products]}))
      
      }
  

    // }, 500)
    
  
  }
 
  
//

  const getProducts = async () => { 
    const params = { page : data.currentPage + 1, limit,category:categ}
  
  const res = await getProductsByCategories(params);
  if (res.ok) {
    const d = res.data;
    setData(data => ({...data,...d, products : [...data.products, ...d.products], currentPage : data.currentPage + 1}))
  
  }
};

  const showNextMatchSearch = async () => {
     
   const query = {limit, next : searchData.index  , search ,category:categ}
      const res = await getProductsBySearch(query);
      
      if (res.ok) {
        setSearchData((prev)=>({...prev,...res.data, products:[...prev.products,...res.data.products]}))
        
      }
    }

useEffect(() => {
    getProducts();
  }, []);



  const cards = useMemo(() => {
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [products])
  const cardsSearch = useMemo(() => {
      return searchData.products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [searchData])
  
  
  const list = search.trim() === '' ? cards : cardsSearch;
  const isMore = search ? searchData.isNext : isNext;
  const isSearch = search.trim() !== '';

  console.log(isMore)

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
