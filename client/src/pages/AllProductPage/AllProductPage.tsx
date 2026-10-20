import { useEffect, useMemo, useState } from 'react'
import style from './AllProductPage.module.css'
import { getProductsByCategories } from '../../api/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { productI } from '../../features/product/types';

export default function AllProductPage() {

 const [products, setProducts] = useState<productI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(products,'products')

  useEffect(() => {
    const getProducts = async () => { 
    
      const res = await getProductsByCategories({ limit: 10, page: currentPage });
      if (res.ok) {
        setProducts([...res.data.products]);
        setTotalPages(res.data.total);
      }
      return
    };

    getProducts();
  }, [currentPage]);


    const cards = useMemo(() => {
      return products.map((p,index) => <ProductCard product={p} key={index}  />)
    }, [products])
  
  
  const buttons = useMemo(() => {
    const buttonsArr = [];
    for (let i = 1; i <= totalPages; i++) {
      buttonsArr.push(<button onClick={()=>setCurrentPage(i)} key={i}>{i}</button>)
      
    }
    return buttonsArr
  },[totalPages])

  return (
    <>
      <div className={style.grid_template_columns}>
      {cards}
      </div>
    
      <div>{buttons}</div>
    </>

  )
}
