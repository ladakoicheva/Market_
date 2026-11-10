import  { useMemo } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router';
import style from './Category.module.css'

export default function Category() {
  const categories = useAppSelector((s) => s.productData.categories);

  const categCards = useMemo(() => {
    return categories.map((c) => <li key={c.text} className={style.categItem}><Link to ={`/products/${c.text}`}>{c.text.toLowerCase()}</Link></li>)
  },[categories])

  
  return (
    <ul className={style.categList}>{ categCards}</ul>
  )
}
