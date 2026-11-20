import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";
import { createError } from "../../utils/createError.js";
import {
  createProductOneDB,
  deleteProductOneDB,
  editProductOneDB,
  getAllProductsDB,
  getProductOneDB,
  getProductsByCategoryDB,
  getUserProductsDB,
} from "../../dbSQL/models/products.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getIscheckIsNext } from "../../utils/pagination.js";





//! all products


export const getUserProducts = asyncHandler(async (req, res) => {

  const { email } = req.user;
  const result = await getUserProductsDB(email);
  return res.status(200).json(getSuccessReq(result.data));

});

export const getAllProducts = asyncHandler(async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const result = await getAllProductsDB(limit, page);
  const isNext = getIscheckIsNext(result.data, limit);

  return res.status(200).json(getSuccessReq({ products: result.data, index: 0, isNext }));
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const category = req.query.category;
  const result = await getProductsByCategoryDB(limit, page, category);
  const isNext = getIscheckIsNext(result.data, limit);

  return res.status(200).json(getSuccessReq({ products: result.data, index: 0, isNext }));
});

//! one product

export const getProductOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await getProductOneDB(id);

  return res.status(200).json(getSuccessReq(result.data));
});

export const editProductOne = asyncHandler(async (req, res) => {
  const result = await editProductOneDB({ ...req.body, id: req.params.id });
  if (!result.ok) throw createError(500, result.e);
  return res.status(200).json(getSuccessReq(result.data));
});

export const getCategories = asyncHandler(async (req, res) => {
  const result = await getFile('datas', 'categories', 'categories.json');
  if (!result.ok) throw createError(500, result.e);
 return res.status(200).json(getSuccessReq(result.data));
});

export const createProductOne = asyncHandler(async (req, res) => {

  const productData = req.body;
  const { email } = req.user;
  const result = await createProductOneDB({ ...productData, owner: email });
  return res.status(201).json(getSuccessReq(result.data));
});


export const deleteProductOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductOneDB(+id);
  if (!result.ok) throw createError(500, result.e);
  return res.status(200).json(getSuccessReq(result.data));
})