import  { useMemo } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router';

export default function Category() {
  const categories = useAppSelector((s) => s.productData.categories);

  const categCards = useMemo(() => {
    return categories.map((c) => <li key={c.text}><Link to ={`/products/${c.text}`}>{c.text}</Link></li>)
  },[categories])

  console.log(categories,categCards)
  return (
    <ul>{ categCards}</ul>
  )
}
