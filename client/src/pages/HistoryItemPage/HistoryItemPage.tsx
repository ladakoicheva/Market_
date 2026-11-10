import { useParams } from "react-router";
import { getHistoryItem } from "../../api/history";
import { useEffect, useMemo, useState } from "react";
import type { productI } from "../../features/product/types";
import { timeStampToDateLocale } from "../../helpers/date";

 

export default function HistoryItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any[]>([]);

  const email = item[0];
  const products = item[1];
  const timestamp = item[2];
  const isItem = item.length > 0;
  console.log(item)



  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await getHistoryItem(id!);
        if (res.ok) setItem(Object.values(res.data))
      } catch (error) {
        console.log(error)
      }
     
    }

    getItem()
    
  }, [])
  
  const cardInfo = useMemo(() => {
    if (!isItem) return
    return <>
      <div>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Дата:</strong> {timeStampToDateLocale(timestamp)}</p>
      
        <h3>Товары:</h3>
        <ul>
          {products.map((product: productI) => (
            <li key={product.id}>
              <p>Название: {product.name}</p>
              <p>Категория: {product.category}</p>
              <p>Цена: ${product.price}</p>
           
            </li>
          ))}
        </ul>
      </div>
    
    </>
      
    {/* <ul>{el[1].map((el: any) => <li>{el.name}</li>) }</ul> */ }
   
  }, [item])
if (item.length == 0) return <div>...loading</div>
  return (
     isItem && cardInfo
  )
}
