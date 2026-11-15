import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { searchProductsInCategDB } from "../../dbSQL/models/search.js";
import { getProductsByCategoryDB } from "../../dbSQL/models/products.js";
import { getAllProductsDB } from "../../dbSQL/models/products.js";
import { searchProductsDB } from "../../dbSQL/models/search.js";





const getIscheckIsNext = (d, limit) => {
  return d.data.length > limit;
}



export const getAllProducts = async (req, res) => {

  const page = +req.query.page;
  const limit = +req.query.limit; //10

  try {
    const reponse = await getAllProductsDB(limit, page);
    const isNext = getIscheckIsNext(reponse, limit);

    return res.status(200).json(getSuccessReq({ products: reponse.data, index: 0, isNext }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }


  // WHERE category = ?
}
//!


// {limit : 10, page : 1}


export const getProductsByCategory = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit; //10
  const category = req.query.category;



  console.log(category, limit)


  try {
    const reponse = await getProductsByCategoryDB(limit, page, category)
    const isNext = getIscheckIsNext(reponse, limit);
    return res.status(200).json(getSuccessReq({ products: reponse.data, index: 0, isNext }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }




}






export const getProductsByCategoryForSearch = async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;
  const category = req.query.category;


  try {
    const productsMatch = await searchProductsInCategDB({ limit, word, cursor, category });

    if (!productsMatch.ok) throw new Error(productsMatch.e)
    const items = productsMatch.data;
    const matchLength = items.length;
    cursor = matchLength === limit ? items[matchLength - 1].id : 0;



    return res.status(200).json(getSuccessReq({ index: cursor, products: items, isNext: !!cursor }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }




}

export const getAllProductsForSearch = async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;

  try {
    const productsMatch = await searchProductsDB({ limit, word, cursor });

    if (!productsMatch.ok) throw new Error(productsMatch.e)
    const items = productsMatch.data;
    const matchLength = items.length;
    cursor = matchLength === limit ? items[matchLength - 1].id : 0;

    return res.status(200).json(getSuccessReq({ index: cursor, products: items, isNext: !!cursor }));

  } catch (error) {

    return res.status(500).json(getErrorReq(error));
  }




}


