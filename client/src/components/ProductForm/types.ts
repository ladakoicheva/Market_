import { CategoriesE } from "../../features/product/types"

export interface productFormValues {
  name: string,
  category:  CategoriesE| undefined,
  price: number,
  inStock:boolean,
};