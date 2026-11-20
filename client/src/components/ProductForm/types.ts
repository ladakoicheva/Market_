import { CategoriesE } from "../../features/product/types"

export interface productFormValues {
  name: string,
  category:  CategoriesE| string,
  price: number,
  inStock:boolean,
};