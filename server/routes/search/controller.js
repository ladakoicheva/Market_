import { setFileJSON } from "../../utils/fs.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";
import categories from '../../datas/categories/categories.json' with {type: 'json'}

export const addProductCategories = async (id, email, category) => {
  const categ = category.trim();

  const foundCategory = categories.find(el => el.text === categ);

  if (foundCategory === undefined) {
    return { ok: false, data: null };
  }

  const categoriesFile = await getFile('datas', 'products', categ + '.json');

  if (!categoriesFile.ok) return { ok: false, data: null };
  const data = { id, email };

  categoriesFile.data.push(data)
  const res = await setFileJSON(categoriesFile.data, 'datas', 'products', categ + '.json');
  console.log(res);
}

export const editProductCategory = async (oldCategory, newCategory, id) => {
  if (oldCategory === newCategory) return { ok: true };

  
  const [oldFileRes, newFileRes] = await Promise.all([
    getFile('datas', 'products', oldCategory + '.json'),
    getFile('datas', 'products', newCategory + '.json')
  ]);

  if (!oldFileRes.ok || !newFileRes.ok) {
    return { ok: false };
  }

  const oldCategData = oldFileRes.data; 
  const newCategData = newFileRes.data;

 
  const index = oldCategData.findIndex((el) => el.id === id);
  if (index === -1) return { ok: false };


  const itemToMove = { ...oldCategData[index], category: newCategory };


  oldCategData.splice(index, 1);
  newCategData.push(itemToMove);


  const res = await Promise.all([
    setFileJSON(oldCategData, 'datas', 'products', oldCategory + '.json'),
    setFileJSON(newCategData, 'datas', 'products', newCategory + '.json')
  ]);

  if (res[0].ok && res[1].ok) return { ok: true };
  return { ok: false };
};

// { "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8", "email": "koichevalada@gmail.com" }