import { useAppSelector } from '../../redux/hooks';
import style from './Header.module.css';
import type React from 'react';
import { Link, useSearchParams } from 'react-router';
import SearchIcon from '../../icons/SearchIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import MarketLogo from '../../icons/MarketLogo';



export default function Header({ children }: { children: React.ReactNode }) {

  const { user } = useAppSelector((s) => s.user);
  const [searchParams,setSearchParams] = useSearchParams('');

  const search = searchParams.get('search') || '';

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim()!=='') {
      setSearchParams({ search: value },{ replace: true }); 
    } else {
      setSearchParams({search:''},{ replace: true }); 
    }
  };

  return (
    <>
   
    <header className={style.header}>
      <Link to='/' className={style.logo} >
        <MarketLogo />
      </Link>

      {/* <nav className={style.pages}>
          <Link to='/add'>Add Product</Link>
          <Link to = '/myProducts'>My Products</Link>
      </nav> */}
       
      <div className={style.searchContainer}>
        <input type="text" className={style.headerSearch} placeholder='search...'  value={search} onChange={handleSearchChange}/>
        <SearchIcon />
      </div>
      {user && <div className={style.userInfo}>
        <Link to={'/me'}><ProfileIcon /></Link>
        <h2>{user?.email}</h2>
      </div>
      }
      {children}
   </header>  </>
  )
}
