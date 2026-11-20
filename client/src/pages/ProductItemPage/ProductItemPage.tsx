import { useEffect, useRef, useState } from 'react';
import { getProductOne } from '../../api/products';
import { useParams } from 'react-router';
import style from './ProductItemPage.module.css'
import type { productI } from '../../features/product/types';
import InStock from '../../components/inStock/InStock';
import EditIcon from '../../icons/EditIcon';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import type { RefObject } from 'react';
import { editProductOneData } from '../../features/product/productSlice';
import { useAppDispatch } from '../../redux/hooks';
import SaveIcon from '../../icons/SaveIcon';
import { formatPrice } from '../../helpers/formatPrice';

export default function ProductItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<productI | null>(null);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch()
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);


  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;
      const res = await getProductOne(Number(id));
      if (res.ok) setItem(res.data);

    }
    getProduct()
  }, [id])

  const editProductInfo = () => {
    setEdit(true);
  }

  const editField = (ref: RefObject<HTMLInputElement | HTMLSelectElement | null>, value: string) => {
    if (!ref.current) return;
    ref.current.value = value;
  };

  const saveEditProduct = async () => {
    if (!item || !nameInputRef.current || !priceInputRef.current || !categorySelectRef.current) return
    const res = await dispatch(editProductOneData({ ...item, name: nameInputRef.current.value, price: +priceInputRef.current.value, category: categorySelectRef.current.value })).unwrap()
    if (res.ok) {
      setEdit(false)
      setItem({ ...item, ...res.data })
    }
  }



  return (
    <div className={style.wrapper} >
      {item &&
        <article className={style.product}>

          <div className={style.image}>
            <InStock inStock={item.inStock} />
          </div>

          <div className={style.infoWrapp}>

            <div className={style.info}>
              <div className={style.edit}>{!edit ? <EditIcon edit={editProductInfo} /> : <SaveIcon onClick={saveEditProduct} />}</div>
              {!edit ?
                <h1>{item.name}</h1> :

                <input ref={nameInputRef} type="text"
                  onChange={(e) => editField(nameInputRef, e.target.value)}
                  defaultValue={item.name} />}

              {!edit ?
                <h2>{formatPrice(item.price)}  </h2>
                : <input ref={priceInputRef} defaultValue={item.price} type="number" min='0'
                  onChange={(e) => editField(priceInputRef, e.target.value)} />}

              {!edit ?
                <h4>category: {item.category} </h4> :
                <CategorySelect selectRef={categorySelectRef}
                  value={item.category}

                  onChange={(e) => editField(categorySelectRef, e.target.value)} />}
              <h5> seller: {item.owner}</h5>
            </div>

          </div>



        </article>}
    </div>
  )

}


// 
//   id: string;
//   name: string;
//   category: "electronics" | "clouthing" | "food" 
//   price: number;
//   inStock: boolean;
//   owner?: string;
//   oldCategory?: string;
// 