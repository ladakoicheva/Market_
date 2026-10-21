import { useEffect, useMemo, useRef, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { productI } from '../../features/product/types';
import { getProductsBySearch } from '../../api/products';

export default function AllProductPage() {

const [products, setProducts] = useState<productI[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [search, setSearch] = useState('');
const timeOutID = useRef<number|null>(null)


  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
   
    setSearch(e.target.value);
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
      timeOutID.current = null
  }

    timeOutID.current = setTimeout(async () => {

      history.pushState(null, "", `?page=1&limit=10&search=${e.target.value}`);
      const res = await getProductsBySearch();
       if (res.ok) {
        setProducts([...res.data.products]);
        setTotalPages(res.data.total);
      }
      return

    }, 500)
    
  
  }
  
  


  useEffect(() => {
    const getProducts = async () => { 
    
      const res = await getProductsByCategories();
      if (res.ok) {
        setProducts([...res.data.products]);
        setTotalPages(res.data.total);
      }
      return
    };


      history.pushState(null, "", `?page=${currentPage}&limit=10&search=""`);
    getProducts();
  }, [currentPage]);


    const cards = useMemo(() => {
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [products])
  
  
  const buttons = useMemo(() => {
    const buttonsArr = [];
    for (let i = 1; i <= totalPages; i++) {
      buttonsArr.push(<button onClick={() => {
        history.pushState(null, "", `?page=${i}&limit=10&search=${search}`);
        setCurrentPage(i)
      }} key={i}>{i}</button>)
    }
    return buttonsArr
  },[totalPages])

  return (
    <>
      <input type="text" placeholder='Search...' value={search} onChange={handleSearch}/>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
    
      <div>{buttons}</div>
    </>

  )
}
