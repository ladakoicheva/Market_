import { useEffect, useState } from 'react';
import { getUserProductItem } from '../../api/products';
import { useParams } from 'react-router';

export default function ProductItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  console.log(item);

  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;
      const res = await getUserProductItem(id);
      if (res.ok) setItem(res.data);

    }
  //  getProduct()
  },[id])
  return (
    <div>ProductItemPage</div>
  )
}
