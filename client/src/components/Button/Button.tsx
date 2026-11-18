import { useState } from 'react'
import style from './Button.module.css'

type props = {
  text: string,
  onClick: (v?:any) =>  any,
  isAsync :boolean,
  type?: string,
  style?: {},
  
  
}

export default function Button(props:props) {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleClick = async() => {
    setIsSubmitting(true)
    try {
      await props.onClick();
    } finally {
      setTimeout(() => setIsSubmitting(false), 500)
    }
  }
  return (

    <button className={style.registerBTN}
      style = {props.style}
      type='button'
      onClick={props.isAsync ? handleClick : props.onClick}
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      aria-label={isSubmitting ? `${props.text} loading` : undefined}>
      {props.text}
    </button>
  )
}
