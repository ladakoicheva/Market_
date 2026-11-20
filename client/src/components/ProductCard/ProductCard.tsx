import type { productI } from "../../features/product/types";
import style from './ProductCard.module.css';
import { addToHistory } from "../../api/history";
import {  useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router";
import Button from "../Button/Button";
import { formatPrice } from "../../helpers/formatPrice";
import DeleteIcon from "../../icons/DeleteIcon";

import InStock from "../inStock/InStock";


type props = {
  product: productI,
  deleteItem:(id: number) => Promise<void>|void
}

export default function ProductCard({ product,deleteItem }: props) {
  const { user } = useAppSelector((s) => s.user);
  const navigate = useNavigate();

  // const handleEdit = () => {
  //   if (!openModal) return;
  //   openModal();
  //   dispatch(updateEditProduct(product));
  // };

  const buyItem =  async() => {
    const res = await addToHistory({ owner: user?.email!, products: [product] });
    if(res.ok)navigate('/history')
  }
  




 


  return (
    <div className={style.card}>
    
      <div className={style.image}>
          
        {user?.email === product.owner &&
          <>
            {/* <div className={style.edit}>
         <EditIcon id={product.id} edit={handleEdit} />
        </div> */}
        <div className={style.delete}>
            <DeleteIcon className={style.deleteIcon} deleteItem={() => deleteItem(product.id)!
              
          } />
          </div>
        </>
        }
        <InStock inStock={product.inStock} />
      </div>

      <div className={style.productInfo}>
        <Link to={`/productItem/${product.id}`}><h2 className={style.productName}>{product.name}</h2></Link>
        <p className={style.productPrice}>
          { formatPrice(+product.price)}
        </p>
      </div>
      <Button text="Buy" onClick={buyItem} isAsync={true} />
     
   </div>
  )
}



  