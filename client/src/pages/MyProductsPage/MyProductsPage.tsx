
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './MyProductsPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthHock } from '../../hocks/AuthHock';
import { deleteProductOneData } from '../../features/product/productSlice';


 function MyProductsPage() {
  
   const { products } = useAppSelector((s) => s.productData);
   const dispatch = useAppDispatch();
   const { isLoadingApp } = useAppSelector((s) => s.user);
   const deleteProduct = (id:number) => {
     dispatch(deleteProductOneData(id))
   }

  const cards = useMemo(() => {
    return products.map((p) => <ProductCard product={p} key={p.id} deleteItem={()=>deleteProduct(p.id)} />)
  },[products])
  if (isLoadingApp) return <Loader />
  
if(products.length <= 0) return  <h1>No products</h1>
 
  return (
    <>  <div className={style.grid_template_columns}>
      {cards  }
    </div>
    </>
  
  )
 }



export default AuthHock(MyProductsPage)
