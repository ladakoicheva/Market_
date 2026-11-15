import { useEffect, useState } from 'react';
import { getUserProductItem } from '../../api/products';
import { useParams } from 'react-router';
import type { productI } from '../../features/product/types';

export default function ProductItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<productI | null>(null);



  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;
      const res = await getUserProductItem(id) ;
      if (res.ok) setItem(res.data );

    }
   getProduct()
  },[id])
  return (
    <div>{item && item.id}</div>
  )
}
