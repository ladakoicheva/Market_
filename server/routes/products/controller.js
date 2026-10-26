import { v4 as uuidv4 } from 'uuid';
import { setFileDirJSON } from '../../utils/fs.js';
import { getAllFiles } from '../../utils/fs.js';
import { addProductCategories } from '../search/controller.js';
import { setFileJSON } from "../../utils/fs.js";
import { editProductCategory } from "../search/controller.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";

export const addProduct = async (req, res) => {
  //  {
  //  "name": "",
  //  "category": "ELECTRONICS",
  //  "price": 200,
  //  "id": "",
  //   "owner": "email saler",
  //  "inStock": true,
  //
  // }

  const id = uuidv4();
  const productData = req.body;
  const { email } = req.user;

  // getAllFiles('datas', 'users', email, 'products');

  const result = await setFileDirJSON({ ...productData, id }, id + '.json', 'datas', 'users', email, 'products');
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  console.log(id, email, productData.category);
  await addProductCategories(id, email,productData.category);
  return res.status(200).json({ ok: true, data: { ...result.data, owner: email ,id} });
};

export const getUserProducts = async (req, res) => {
  //  {
  //  "name": "",
  //  "category": "ELECTRONICS",
  //  "price": 200,
  //  "id": "",
  //   "owner": "email saler",
  //  "inStock": true,
  //
  // }
  const {email } = req.user
  const result = await getAllFiles('datas', 'users', email, 'products');
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: result.data});
  
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

  // if (!result.ok) return res.status(500).json(getErrorReq('failed to rewrite data'));


}


export const getCategories = async (req, res) => {
  const categories = await getFile('datas', 'categories', 'categories.json');
  if (categories.ok) return res.status(200).json(categories);
  return res.status(500).json(getErrorReq(null));
}