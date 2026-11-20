import { getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile, setFileJSON } from "../../utils/fs.js";
import { searchProductsDB, searchProductsInCategDB } from "../../dbSQL/models/search.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createError } from "../../utils/createError.js";



export const getProductsByCategoryForSearch = asyncHandler(async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;
  const category = req.query.category;

  const result = await searchProductsInCategDB({ limit, word, cursor, category });
  if(!result.ok) throw createError(500,result.e)
  const matchLength = result.length;
  cursor = matchLength === limit ? result[matchLength - 1].id : 0;

  return res.status(200).json(getSuccessReq({ index: cursor, products: result.data, isNext: !!cursor }));

})

export const getAllProductsForSearch = asyncHandler(async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;

  const result = await searchProductsDB({ limit, word, cursor });
  if (!result.ok) throw createError(500, result.e)
  const matchLength = result.length;
  cursor = matchLength === limit ? result[matchLength - 1].id : 0;

  return res.status(200).json(getSuccessReq({ index: cursor, products: result.data, isNext: !!cursor }));


})
