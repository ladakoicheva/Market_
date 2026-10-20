import { authorize } from "../../middlewares/auth.js";
import { Router } from "express";
import { addProduct } from "./productsController.js";
import { getUserProducts } from "./productsController.js";
import { getCategories } from "./productsController.js";
import { getProductsByCategory } from "../search/controller.js";
import { editProduct } from "./productsController.js";


export const productRouter = Router();

productRouter.post('/add', authorize, addProduct);
productRouter.get('/get', authorize, getUserProducts);
productRouter.get('/categories', getCategories)

productRouter.patch('/edit', authorize, editProduct)

productRouter.get('/search/category', getProductsByCategory);

// data, fileName, ...url