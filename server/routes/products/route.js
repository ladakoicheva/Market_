import { authorize } from "../../middlewares/auth.js";
import { Router } from "express";
import { addProduct } from "./productsController.js";
import { getUserProducts } from "./productsController.js";
import { getFile } from "../../utils/fs.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { setFileJSON } from "../../utils/fs.js";
import { editProductCategory } from "../search/controller.js";



export const productRouter = Router();

productRouter.post('/add', authorize, addProduct);
productRouter.get('/get', authorize, getUserProducts)
productRouter.get('/categories', async (req,res) => {
  const categories = await getFile('datas', 'categories', 'categories.json');
  if (categories.ok) return res.status(200).json(categories);
  return res.status(500).json(getErrorReq(null));
})

productRouter.patch('/edit', authorize, async (req, res) => {
  const { email } = req.user;
  const newProduct = req.body;
  console.log(newProduct)

   
  

  

  const result = await Promise.all([setFileJSON(newProduct, 'datas', 'users', email, 'products', newProduct.id + '.json'), editProductCategory(newProduct.oldCategory,newProduct.category,newProduct.id)]);
  // if (!result.ok) return res.status(500).json(getErrorReq('failed to rewrite data'));
  console.log(result)
  return res.status(200).json(getSuccessReq(newProduct));

})


// data, fileName, ...url