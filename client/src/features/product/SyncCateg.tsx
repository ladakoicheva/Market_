import { useEffect } from 'react';
import { getCategoriesData } from './productSlice';
import { useAppDispatch } from '../../redux/hooks';

export default function SyncCateg() {
  const dispatch = useAppDispatch()

  useEffect(() => {
     dispatch(getCategoriesData());
    
  },[])

  return null
}
