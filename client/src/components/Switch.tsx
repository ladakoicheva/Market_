import { useField } from "formik";
import Switch from "@mui/material/Switch";


type Props = {
  name: string;
  label?: string;
  id: string;
};

export default function Switches({ name ,id}: Props) {

  const [field] = useField({ name, type: "checkbox",id });

  return (
    
     <Switch {...field} checked={field.value}/>
      
    
  );
}