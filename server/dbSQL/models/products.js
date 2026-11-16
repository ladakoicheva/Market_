import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js";
import { DB } from "../index.js";



export const createProductDB = async (product) => {

    const [{ insertId }] = await DB.execute(
      `INSERT INTO products(name, category, price, inStock, owner)
     VALUES (?, ?, ?, ?, ?)
    `,
      [product.name, product.category, product.price, product.inStock, product.owner]
    )

    return { ...product, id: insertId }

 



}

export const getUserProductsDB = async (email) => {

  
    const [result] = await DB.execute(`
      SELECT *
      FROM products 
      WHERE owner = ?
      
      `, [email]);


    return result;

}


export const getAllProductsDB = async (limit, page) => { // 10 1

     const skip = (page - 1) * limit

    const [result] = await DB.query(
    'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 
     [limit, skip]
    )
   // console.log(products)
    return result




}

// 'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 

export const getProductItemDB = async (id) => {
  

    const [[result]] = await DB.query(
      'SELECT * FROM products WHERE id = ? ',
      [id]
    )
    return result
 
 
}


export const getProductsByCategoryDB = async (limit, page , category) => { // 10 1

    const skip = (page - 1) * limit

    const [products] = await DB.query(
      'SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?',
      [category, limit, skip]
    )

    return products




}



