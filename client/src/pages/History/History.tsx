import { getHistory } from '../../api/history';
import { useMemo } from 'react';
import { AuthHock } from '../../hocks/AuthHock';
import { useProducts } from '../../hooks/useProducts/useProducts';
import { Link } from 'react-router';
import type { historyI } from '../../features/history/types';


function History() {

  const { 
    products,
    isMore,
    getNext,
  } = useProducts<historyI>({  getProductsAll:getHistory });




  

  const list = useMemo(() => {
    
    return products.productsData.map((el) => el.products.map((p) => <li key={el.date}><Link to = {'/history/'+el.date}>{p!.name}</Link></li>))
  }, [products])

  return (<>
    <ul>{list}</ul>
    {isMore && <button onClick={getNext}>next</button>}
  </>


  )
}

export default AuthHock(History);