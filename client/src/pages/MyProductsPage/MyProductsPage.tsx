
import { useAppSelector } from '../../redux/hooks';
import style from './MyProductsPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

type props={
  closeModal: () => void,
  openModal:()=>void
}

export default function MyProductsPage({ openModal, closeModal }: props) {
  
  const { products } = useAppSelector((s) => s.productData);
  
  const {isLoadingApp} = useAppSelector((s)=>s.user)
  const cards = useMemo(() => {
    return products.map((p) => <ProductCard product={p} key={p.id} openModal={openModal} closeModal={ closeModal} />)
  },[products])
  if (isLoadingApp ) return <Loader />
if(products.length <= 0) return  <h1>No products</h1>
 console.log(products)
  return (
    <>  <div className={style.grid_template_columns}>
      {cards  }
    </div>
    </>
  
  )
}
