import { DB } from "../index.js";
import { getSuccessReq } from "../../utils/responseHelpers.js";



const getSQLReqData = async ({ limit, word, cursor, category=null }) => {
  const [result] = category
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

  return result;
};



export const searchProductsDB = async ({ limit, word, cursor }) => { // 10 1

  const result = await getSQLReqData({ limit, word, cursor })
  return getSuccessReq(result);




}


export const searchProductsInCategDB = async ({ limit, word, cursor, category }) => {

  const result = await getSQLReqData({ limit, word, cursor, category });
  return getSuccessReq(result);


}