import  { useEffect } from 'react'
import { authorizeUser } from './userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'


export default function Auth() {

  const dispatch=useAppDispatch()

  useEffect(() => {
    
    dispatch(authorizeUser())
  },[])
  return null
}
