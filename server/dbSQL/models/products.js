import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js";
import { DB } from "../index.js";

//! all products



export const getUserProductsDB = async (email) => {
  const [result] = await DB.execute(`
      SELECT *
      FROM products 
      WHERE owner = ?
      
      `, [email]);
  return getSuccessReq(result);

}


export const getAllProductsDB = async (limit, page) => { // 10 1
  const skip = (page - 1) * limit
  const [result] = await DB.query(
    'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 
    [limit, skip]
  )
  // console.log(products)
  return getSuccessReq(result)




}

// 'SELECT * FROM products LIMIT ? OFFSET ?', // ORDER BY price 



export const getProductsByCategoryDB = async (limit, page, category) => { // 10 1

  const skip = (page - 1) * limit
  const [products] = await DB.query(
    'SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?',
    [category, limit, skip]
  )
  return getSuccessReq(products)




}


//! one product





export const deleteProductOneDB = async (id) => {
  const [result] = await DB.query(`
      DELETE FROM products WHERE id = ?`,
    [id]);

  const countRemoveProducts = result.affectedRows; // 1 - good | 0 - bad


  if (countRemoveProducts == 0) return getErrorReq('failed to delete');

  

  //return {ok : countRemoveProducts === 1}
  return getSuccessReq(id);

}

export const editProductOneDB = async ({ name, category, price, inStock, id }) => {

  const [result] = await DB.execute(
    `UPDATE products SET name = ?, category = ?, price = ?, inStock = ? WHERE id = ?`,
    [name, category, price, inStock, id]
  )
  const countRemoveProducts = result.changedRows;

  if (countRemoveProducts == 0) return getErrorReq('not found or unchanged');


  return getSuccessReq({ name, category, price, inStock, id })

}


export const getProductOneDB = async (id) => {
  const [[result]] = await DB.query(
    'SELECT * FROM products WHERE id = ? ',
    [id]
  )
  return getSuccessReq(result)


}
export const createProductOneDB = async (product) => {
  const [{ insertId }] = await DB.execute(
    `INSERT INTO products(name, category, price, inStock, owner)
     VALUES (?, ?, ?, ?, ?)
    `,
    [product.name, product.category, product.price, product.inStock, product.owner]
  )
  return getSuccessReq({ ...product, id: insertId })
}