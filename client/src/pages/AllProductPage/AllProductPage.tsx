import { useEffect, useMemo, useRef, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { productI } from '../../features/product/types';


const limit = 10

export default function AllProductPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<{
    products: productI[], index: number,
    currentPage: number, hasMore: boolean
  }>({
  products: [],
  index: limit, //!
  currentPage: 0,
  hasMore:true,
  });


  const { products,  index, currentPage,hasMore } = data;
  const timeOutID = useRef<number|null>(null)


  //для пагинации
  useEffect(() => {
       history.pushState(null, "", `?page=${currentPage}&limit=10&search=${search}&next=${index}`);
  },[data])

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    setSearch(e.target.value);
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
      timeOutID.current = null
  }

    timeOutID.current = setTimeout(async () => {

    
      const res = await getProductsByCategories();
      if (res.ok) {
        
        setCurrentPage(1)
        // setProducts((prev)=>[..]);
         setTotalPages(res.data.total);
     
        //  setNext(res.data.index )
        
      }
      return

    }, 500)
    
  
  }
 
  
//

  const getProducts = async () => { 
    const params = { page : data.currentPage + 1, limit}
  
  const res = await getProductsByCategories(params);
  if (res.ok) {
    const d = res.data;
    setData(data => ({...data,...d, products : [...data.products, ...d.products], currentPage : data.currentPage + 1}))
  
  }
};



useEffect(() => {
    getProducts();
  }, []);



    const cards = useMemo(() => {
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [products])
  


  return (
    <>
      <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      {hasMore && <button onClick={getProducts}>neext</button>
    
  } 
  </>
  )
}
