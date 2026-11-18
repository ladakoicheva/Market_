import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './Header.module.css';
import type { ChangeEvent, ReactNode } from 'react';
import { Link } from 'react-router';
import SearchIcon from '../../icons/SearchIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import MarketLogo from '../../icons/MarketLogo';
import { setSearch } from '../../features/search/search';



export default function Header({ children }: { children: ReactNode }) {

  const { user } = useAppSelector((s) => s.user);
  const search = useAppSelector((s) => s.search.search);
  const dispatch = useAppDispatch();
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <>
   
    <header className={style.header}>
      <Link to='/' className={style.logo} >
        <MarketLogo />
      </Link>

  
       
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
