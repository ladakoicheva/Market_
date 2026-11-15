import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js";
import { DB } from "../index.js";



export const createProductDB = async (product) => {
  try {
    const [{ insertId }] = await DB.execute(
      `INSERT INTO products(name, category, price, inStock, owner)
     VALUES (?, ?, ?, ?, ?)
    `,
      [product.name, product.category, product.price, product.inStock, product.owner]
    )

    return getSuccessReq({ ...product, id: insertId })

  } catch (error) {
    return getErrorReq(error)
  }




}

export const getUserProductsDB = async (email) => {
  try {
    const [res] = await DB.execute(`
      SELECT *
      FROM products 
      WHERE owner = ?
      
      `, [email]);


    return getSuccessReq(res);
  } catch (error) {
    return getErrorReq(error);
  }
}


export const getAllProductsDB = async (limit, page) => { // 10 1

  try {
     const skip = (page - 1) * limit

    const [products] = await DB.query(
    'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 
     [limit, skip]
    )
   // console.log(products)
    return getSuccessReq(products)
  } catch (error) {
    return getErrorReq(error)
  }



}

// 'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 

export const getProductItemDB = async (id) => {
  try {

    const [[product]] = await DB.query(
      'SELECT * FROM products WHERE id = ? ',
      [id]
    )
    return getSuccessReq(product)
  } catch (error) {
    return getErrorReq(error)
  }
 
}


export const getProductsByCategoryDB = async (limit, page , category) => { // 10 1

  try {
    const skip = (page - 1) * limit

    const [products] = await DB.query(
      'SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?',
      [category, limit, skip]
    )

    return getSuccessReq(products)
  } catch (error) {
    return getErrorReq(error
    )
  }



}



