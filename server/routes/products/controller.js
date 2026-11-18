import { setFileJSON } from "../../utils/fs.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";
import {
  createProductDB,
  getAllProductsDB,
  getProductItemDB,
  getProductsByCategoryDB,
  getUserProductsDB,
} from "../../dbSQL/models/products.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getIscheckIsNext } from "../../utils/pagination.js";



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

export const addProduct = asyncHandler(async (req, res) => {

  const productData = req.body;
  const { email } = req.user;
  const result = await createProductDB({ ...productData, owner: email });
  return res.status(201).json(getSuccessReq(result));
});

export const getUserProducts = asyncHandler(async (req, res) => {

  const { email } = req.user;
  const result = await getUserProductsDB(email);
  return res.status(200).json(getSuccessReq(result));

});

export const getUserProductItem = asyncHandler(async (req, res) => {

  const id = req.params.id;
  const result = await getProductItemDB(id);
  return res.status(200).json(getSuccessReq(result));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const result = await getAllProductsDB(limit, page);
  const isNext = getIscheckIsNext(result, limit);

  return res.status(200).json(getSuccessReq({ products: result, index: 0, isNext }));
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const category = req.query.category;
  const result = await getProductsByCategoryDB(limit, page, category);
  const isNext = getIscheckIsNext(result, limit);

  return res.status(200).json(getSuccessReq({ products: result, index: 0, isNext }));
});

export const editProduct = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const newProduct = req.body;

  const oldCategory = newProduct.oldCategory;
  delete newProduct.oldCategory

  
    await Promise.all([
      setFileJSON(newProduct, 'datas', 'users', email, 'products', newProduct.id + '.json'),
      editProductCategory(oldCategory, newProduct.category, newProduct.id)
    ]);
    return res.status(200).json(getSuccessReq({ ok: true }))
  
   
  });





export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getFile('datas', 'categories', 'categories.json');
  if (categories.ok) return res.status(200).json(categories);
  return res.status(500).json(getErrorReq(null));
});
