import { getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile, setFileJSON } from "../../utils/fs.js";
import { searchProductsDB, searchProductsInCategDB } from "../../dbSQL/models/search.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const editProductCategory = async (oldCategory, newCategory, id) => {
  if (oldCategory === newCategory) return { ok: true };

  const [oldFileRes, newFileRes] = await Promise.all([
    getFile("datas", "products", `${oldCategory}.json`),
    getFile("datas", "products", `${newCategory}.json`),
  ]);

  if (!oldFileRes.ok) return oldFileRes;
  if (!newFileRes.ok) return newFileRes;

  const oldCategoryProducts = oldFileRes.data;
  const newCategoryProducts = newFileRes.data;
  const productIndex = oldCategoryProducts.findIndex(
    (product) => String(product.id) === String(id),
  );

  if (productIndex === -1) {
    return { ok: false, e: new Error(`Product ${id} not found in ${oldCategory}`) };
  }

  const [product] = oldCategoryProducts.splice(productIndex, 1);
  newCategoryProducts.push(product);

  const results = await Promise.all([
    setFileJSON(oldCategoryProducts, "datas", "products", `${oldCategory}.json`),
    setFileJSON(newCategoryProducts, "datas", "products", `${newCategory}.json`),
  ]);

  const failedResult = results.find((result) => !result.ok);
  return failedResult ?? { ok: true };
};

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
