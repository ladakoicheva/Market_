import { setFileJSON } from "../../utils/fs.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";
import { createProductDB } from '../../dbSQL/models/products.js';
import { getUserProductsDB } from '../../dbSQL/models/products.js';
import { getProductItemDB } from "../../dbSQL/models/products.js";


export const addProduct = async (req, res) => {

  const productData = req.body;
  const { email  } = req.user;
  const result = await createProductDB({ ...productData, owner: email});
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: result.data });
};

export const getUserProducts = async (req, res) => {
 
  const { email } = req.user;
  const result = await getUserProductsDB(email);
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: result.data});
  
}

export const getUserProductItem = async (req, res) => {

  const id = req.params.id;
  const product = await getProductItemDB(id);
  if (!product.ok) return res.status(500).json({ ok: false, e: product.e });
  return res.status(200).json({ ok: true, data: product.data });
}


export const editProduct = async (req, res) => {
  const { email } = req.user;
  const newProduct = req.body;

  const oldCategory = newProduct.oldCategory;
  delete newProduct.oldCategory

  try {
    await Promise.all([
      setFileJSON(newProduct, 'datas', 'users', email, 'products', newProduct.id + '.json'),
      editProductCategory(oldCategory, newProduct.category, newProduct.id)
    ]);
    return res.status(200).json(getSuccessReq({ok : true}))
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(getErrorReq(error));
  }



}


export const getCategories = async (req, res) => {
  const categories = await getFile('datas', 'categories', 'categories.json');
  if (categories.ok) return res.status(200).json(categories);
  return res.status(500).json(getErrorReq(null));
}




