import style from './FilterModal.module.css'
import Category from '../Category/Categories'

export default function FilterModal() {
  return (
    <div className={style.modal}>
      <h2>Categories:</h2>
      <Category/>
    </div>
  )
}
