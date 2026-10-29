import  { useEffect } from 'react'
import { authorizeUser } from './userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'


export default function Auth() {
  const {user} = useAppSelector((s)=>s.user)
  const dispatch=useAppDispatch()

  useEffect(() => {
    
    dispatch(authorizeUser())
  },[!!user])
  return null
}
