import { useAppSelector } from '../../redux/hooks';
import style from './Header.module.css';
import type React from 'react';
import { Link } from 'react-router';

export default function Header({ children }: { children: React.ReactNode }) {

  const { user } = useAppSelector((s) => s.user);
  return (
    <header className={style.header}>
   
      <nav>
     
        <div className={style.pages}>
          <Link to='/add'>Add Product</Link>
          <Link to = '/myProducts'>My Products</Link>
        </div>
         <div className={style.userInfo}>
          <h2>{user?.email}</h2>
        </div>

        {children}
      </nav>
  
   </header>
  )
}
