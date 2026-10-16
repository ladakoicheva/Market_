import { v4 as uuidv4 } from 'uuid';
import { setFileDirJSON } from '../../utils/fs.js';
import { getAllFiles } from '../../utils/fs.js';
import { addProductCategories } from '../search/controller.js';


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