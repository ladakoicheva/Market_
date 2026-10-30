import Category from "../../components/Category/Categories";
import { useEffect } from "react";
import type { productI } from "../../features/product/types";
import { useMemo } from "react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../api/products";
import style from '../CategProductPage/AllProductPage.module.css'

const limit = 10

export default function AllProductPage() {

  

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



    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = async () => { 
      const params = { page :currentPage + 1, limit}
    
    const res = await getAllProducts(params);
    if (res.ok) {
      const d = res.data;
      setData(data => ({...data,...d, products : [...data.products, ...d.products], currentPage : data.currentPage + 1}))
    
    }
  };
  
  
  return (
    <>
    <Category/>
   
      <div className={style.grid_template_columns}>
      {cards}
      </div>
      {isNext && <button onClick={getProducts}>neext</button>} 
    </>
  
  )
}
