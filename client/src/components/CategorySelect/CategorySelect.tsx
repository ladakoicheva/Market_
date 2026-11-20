import { useAppSelector } from '../../redux/hooks';
import type { ChangeEvent, Ref } from 'react';

type Props = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value : string ;
  selectRef?: Ref<HTMLSelectElement>;
};

export default function CategorySelect({ onChange, value, selectRef }: Props) {
  const { categories } = useAppSelector((s) => s.productData);
 
  
  return (
    <select
      id="category"
      name="category"
      ref={selectRef}
      defaultValue={value}
      onChange={onChange}
   >
            
      <option value="choose" hidden>Сhoose Category</option>
        {
        categories.map((c)=><option value={c.text} key={c.text}>{c.text}</option>)
        }
             
      </select>
  )
}
