import { getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile, setFileJSON } from "../../utils/fs.js";
import { searchProductsDB, searchProductsInCategDB } from "../../dbSQL/models/search.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



export const getProductsByCategoryForSearch = asyncHandler(async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;
  const category = req.query.category;

  const result = await searchProductsInCategDB({ limit, word, cursor, category });
  const matchLength = result.length;
  cursor = matchLength === limit ? result[matchLength - 1].id : 0;

  return res.status(200).json(getSuccessReq({ index: cursor, products: result, isNext: !!cursor }));

})

export const getAllProductsForSearch = asyncHandler(async (req, res) => {

  const limit = +req.query.limit; //10
  let cursor = +req.query.next || 0;
  const word = req.query.search;

  const result = await searchProductsDB({ limit, word, cursor });
  const matchLength = result.length;
  cursor = matchLength === limit ? result[matchLength - 1].id : 0;

  return res.status(200).json(getSuccessReq({ index: cursor, products: result, isNext: !!cursor }));


})
