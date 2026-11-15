import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js";
import { DB } from "../index.js";




const getSQLReqData = async ({ limit, word, cursor, category }) => {
  const [products] = category
    ? await DB.query(
      `SELECT * FROM products
         WHERE name LIKE ? AND id > ? AND category = ?
         ORDER BY id ASC
         LIMIT ?`,
      [`%${word}%`, cursor, category, limit]
    )
    : await DB.query(
      `SELECT * FROM products
         WHERE name LIKE ? AND id > ?
         ORDER BY id ASC
         LIMIT ?`,
      [`%${word}%`, cursor, limit]
    );

  return products;
};



export const searchProductsDB = async ({ limit, word, cursor }) => { // 10 1

  try {


    const products = await getSQLReqData({ limit, word, cursor })

    console.log(products)
    return getSuccessReq(products)
  } catch (error) {
    return getErrorReq(error)
  }



}


export const searchProductsInCategDB = async ({ limit, word, cursor, category }) => {
  try {


    const products = await getSQLReqData({ limit, word, cursor, category })
    console.log(products)

    return getSuccessReq(products)
  } catch (error) {
    return getErrorReq(error)

  }
}