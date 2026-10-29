import React from 'react'
import { useAppSelector } from '../redux/hooks'
import Page404 from '../pages/404Page/Page404';

export const AuthHock = (Component: React.FunctionComponent) => (props: any) => {
  const { user,isLoadingApp } = useAppSelector((s) => s.user);
  return (
    
    !user && !isLoadingApp ? <Page404 /> :
      <Component {...props} />
  )
}
