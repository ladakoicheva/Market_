import { authorize } from "../../middlewares/auth.js";
import { Router } from "express";
import {
  addProduct,
  editProduct,
  getAllProducts,
  getCategories,
  getProductsByCategory,
  getUserProductItem,
} from "./controller.js";

export const productRouter = Router();

productRouter.get('/categories', getCategories);
productRouter.get('/categories/products', getProductsByCategory);
productRouter.get('/', getAllProducts);
productRouter.post('/', authorize, addProduct);
productRouter.get('/:id', getUserProductItem);
productRouter.patch('/:id', authorize, editProduct);

// data, fileName, ...url