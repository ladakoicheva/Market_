import { getHistory } from '../../api/history';
import { useMemo } from 'react';
import { useEffect } from 'react';
import type { productI } from '../../features/product/types';
import { useState } from 'react';
import { AuthHock } from '../../hocks/AuthHock';

 interface orderI {
  date: string;
  owner: string;
  products: productI[];
 }
const limit = 10;

 function History() {
  
 const [data, setData] = useState<{
        history: orderI[], 
        currentPage: number, isNext: boolean
      }>({
     history: [],
      currentPage: 1,
      isNext:false,
      });

  
  
  useEffect(() => {
      history.replaceState(null,'',`?page=${data.currentPage}`)
    }, [data])
    
  
  useEffect(() => {

    const getAllHistory = async () => {
      const res = await getHistory({ limit, page: data.currentPage }) ;
      if (res.ok) setData({ ...data, ...res.data });

        
    }
    getAllHistory()
  }, [])
   
   const showNext = async () => {
     const res = await getHistory({ limit, page: data.currentPage+1});
      if (res.ok) setData((prev)=>({ ...prev, ...res.data , history:[...prev.history,...res.data.history],currentPage:prev.currentPage+1}));
   }
  
 const list = useMemo(() => {
   return data.history.map((el) => el.products.map((p) => <li key ={el.date}>{p.name}</li>))
 }, [data])
  
   return (<>
     <ul>{list}</ul>
     {data.isNext &&  <button onClick={showNext}>next</button>}
  </>
  
    
  )
}

export default AuthHock(History);