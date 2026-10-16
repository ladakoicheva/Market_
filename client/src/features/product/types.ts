export enum CategoriesE  {
  ELECTRONICS = "ELECTRONICS",
  CLOUTHING = ' CLOUTHING',
  FOOD ="FOOD",

}

export type category = {text:CategoriesE}


  

export interface productI {
  name: string,
  category:  CategoriesE | undefined,
  price: number,
  id: string,
  owner: string;
  inStock: boolean;
  oldCategory?:string
}

export interface stateI {
  editProduct:{isEdit:boolean,product:productI}
  products: productI[];
   categories:category[]
}