import { authorize } from "../../middlewares/auth.js";
import { Router } from "express";
import { addProduct } from "./controller.js";
import { getUserProducts } from "./controller.js";
import { getCategories } from "./controller.js";
import { getProductsByCategory } from "../search/controller.js";
import { editProduct } from "./controller.js";
import { getProductsByCategoryForSearch } from "../search/controller.js";
import { getAllProducts } from "../search/controller.js";
import { getAllProductsForSearch } from "../search/controller.js";
import { getUserProductItem } from "./controller.js";

export const productRouter = Router();

productRouter.post('/add', authorize, addProduct);
productRouter.get('/get', authorize, getUserProducts);
productRouter.patch('/edit', authorize, editProduct)


productRouter.get('/categories', getCategories)



productRouter.get('/category', getProductsByCategory);
productRouter.get('/search', getProductsByCategoryForSearch);
productRouter.get('/all', getAllProducts);
productRouter.get('/search/all',getAllProductsForSearch)

// data, fileName, ...url