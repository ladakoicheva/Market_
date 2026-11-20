import { authorize } from "../../middlewares/auth.js";
import { Router } from "express";
import {
  createProductOne,
  editProductOne,
  deleteProductOne,
  getAllProducts,
  getCategories,
  getProductsByCategory,
  getProductOne,
} from "./controller.js";

export const productRouter = Router();

productRouter.get('/categories', getCategories);
productRouter.get('/categories/products', getProductsByCategory);
productRouter.get('/', getAllProducts);
productRouter.post('/', authorize, createProductOne);
productRouter.get('/:id', getProductOne);
productRouter.patch('/:id', authorize, editProductOne);
productRouter.delete('/:id', authorize, deleteProductOne);

// data, fileName, ...url