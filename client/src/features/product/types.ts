export enum CategoriesE  {
  ELECTRONICS = "electronics",
  CLOUTHING = 'clouthing',
  FOOD ="food",

}

export type category = {text:CategoriesE}


  

export interface productI {
  name: string,
  category:  CategoriesE | string,
  price: number,
  id: number,
  owner?: string;
  inStock: boolean;
  oldCategory?:string
}

export interface stateI {
  editProduct:{isEdit:boolean,product:productI}
  products: productI[];
  categories:category[]
}