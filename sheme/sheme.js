export const roles = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  SELLER: 'SELLER',
}
const userAdmin = {
  "email": "koichevalada@gmail.com",
  "password": "123456789",
  "id": "bd1dca6d-6ae9-4107-b374-e5322f30d9d0",
  role: roles.ADMIN
}


// 
const CATEGORIES = {
  ELECTRONICS: "ELECTRONICS",
  CLOUTHING: ' CLOUTHING',
  FOOD: "FOOD",

}

const PRODUCT = {
  name: '',
  category: CATEGORIES.ELECTRONICS,
  price: 200,
  id: '',
  owner: 'id saler'
}



//products history


const history = {
  date: '',
  owner : 'id',
  products: [
    {
      name: '',
      price: 200,
      count: 2,
      id: ''
    },
    {
      name: '',
      price: 200,
      count: 2,
      id: ''
    }
  ]
}