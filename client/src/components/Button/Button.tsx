import { useState } from 'react'
import style from './Button.module.css'

type props = {
  text: string,
  onClick: () => void,
  isAsync :boolean,
  type?: string,
  style?:{}
  
}

export default function Button(props:props) {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleClick = async() => {
    setIsSubmitting(true)
    await props.onClick();
    setTimeout(() => {
      setIsSubmitting(false)
    },500)
   
   
   
   
   
  }
  return (

    <button className={style.registerBTN}
      style = {props.style}
      type='button'
      onClick={props.isAsync ? handleClick : props.onClick} disabled={isSubmitting}>
      {!isSubmitting ? props.text : <div className={style.loader}></div>}</button>
  )
}
