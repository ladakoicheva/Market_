import type { productI } from "../../features/product/types";
import style from './ProductCard.module.css';
import { updateEditProduct } from "../../features/product/productSlice";
import { addToHistory } from "../../api/history";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import EditIcon from "../../icons/EditIcon";

type Props = {
  product: productI,
  closeModal?: () => void,
  openModal?: () => void
}

export default function ProductCard({ product, openModal }: Props) {
  const { user } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!openModal) return;
    openModal();
    dispatch(updateEditProduct(product));
  };

  const buyItem =  async() => {
    const res = await addToHistory({ owner: user?.email!, products: [product] });
    if(res.ok)navigate('/history')
  }


 


  return (
    <div className={style.card}>
    
      <div className={style.image}>
          {openModal && (
        <div className={style.edit}>
          <EditIcon id={product.id} edit={handleEdit} />
        </div>
        )}
         <h2 className={`${style.isInStock} ${product.inStock ? style.stockAvailable : style.stockUnavailable}`}>
        {product.inStock ? "in Stock" : "Out of stock"}
      </h2>
      </div>

      <div className={style.productInfo}>
        <h2 className={style.productName}>{product.name}</h2>
        <p className={style.productPrice}>
          {product.price}<span className={style.productCurrency}>$</span>
        </p>
      </div>
      <Button text="Buy" onClick={buyItem} isAsync={true} />
     
   </div>
  )
}



  // <svg
  //   onClick={()=>{
  //     openModal();
  //     dispatch(updateEditProduct(product))
  //   } }
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="24"
  //   height="24"
  //   viewBox="0 0 24 24"
  //   fill="none"
  //   stroke="currentColor"
  //   strokeWidth="2"
  //   strokeLinecap="round"
  //   strokeLinejoin="round"
   
  // >
  //   <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
  //   <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  // </svg>