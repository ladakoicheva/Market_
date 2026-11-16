import { Router } from "express";
import { getAllProductsForSearch, getProductsByCategoryForSearch } from "./controller.js";

export const searchRouter = Router();

searchRouter.get('/category', getProductsByCategoryForSearch);
searchRouter.get('/', getAllProductsForSearch);
