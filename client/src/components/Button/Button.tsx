import { useState } from 'react'
import style from './Button.module.css'

type props = {
  text: string,
  onClick: () => void | Promise<void>,
  isAsync :boolean,
  type?: string,
  style?: {},
  color?:string
  
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
      {!isSubmitting ? props.text : (
        <span
          className="inline-block size-5 animate-[spin_0.6s_linear_infinite] rounded-full border-2 border-white border-t-transparent"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
