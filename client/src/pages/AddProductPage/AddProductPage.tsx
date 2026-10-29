import ProductForm from "../../components/ProductForm/ProductForm";
import style from '../AddProductPage/AddProductPage.module.css';
import { AuthHock } from "../../hocks/AuthHock";

 function AddProductPage() {
  return (
    <div className={style.wrapper}>
    <ProductForm/>
    </div>
  
  )
  
  
}

export default AuthHock(AddProductPage)