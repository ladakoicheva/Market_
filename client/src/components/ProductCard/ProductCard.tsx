import type { productI } from "../../features/product/types";
import style from './ProductCard.module.css';
import { updateEditProduct } from "../../features/product/productSlice";
import { useDispatch } from "react-redux";

type props ={
  product: productI,
   closeModal: () => void,
  openModal:()=>void
}

export default function ProductCard({ product, closeModal, openModal }: props) {
  console.log(product)
  const dispatch = useDispatch();
  return (
    <div className={style.card}>
      <div className={style.edit}>
        <svg
    onClick={()=>{
      openModal();
      dispatch(updateEditProduct(product))
    } }
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
   
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
</div>
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <p>{product.price}</p>
    </div>
  )
}
