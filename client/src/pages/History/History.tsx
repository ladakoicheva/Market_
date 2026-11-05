import { getHistory } from '../../api/history';
import { useMemo } from 'react';
import { AuthHock } from '../../hocks/AuthHock';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router';


function History() {

  const { 
    products,
    isMore,
    getNext,
  } = useProducts({  getProductsAll:getHistory });

console.log(products)


  

  const list = useMemo(() => {
    
    return products.productsData.map((el:any) => el.products.map((p:any) => <li key={el.date}><Link to = {'/history/'+el.date}>{p.name}</Link></li>))
  }, [products])

  return (<>
    <ul>{list}</ul>
    {isMore && <button onClick={getNext}>next</button>}
  </>


  )
}

export default AuthHock(History);