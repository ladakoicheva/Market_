import { setFileJSON } from "../../utils/fs.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { getFile } from "../../utils/fs.js";
import categories from '../../datas/categories/categories.json' with {type: 'json'}
import fs from 'node:fs/promises'
import { getLink } from "../../utils/fs.js";

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


  try {
    const [oldFileRes, newFileRes] = await Promise.all([
      getFile('datas', 'products', oldCategory + '.json'),
      getFile('datas', 'products', newCategory + '.json')
    ]);
    const oldCategData = oldFileRes.data;
    const newCategData = newFileRes.data;
    const index = oldCategData.findIndex((el) => el.id === id);
    if (index !== -1) return { ok: false }
    oldCategData.splice(index, 1);
    const itemToMove = oldCategData[index];
    newCategData.push(itemToMove);
  const res = await Promise.all([
    setFileJSON(oldCategData, 'datas', 'products', oldCategory + '.json'),
    setFileJSON(newCategData, 'datas', 'products', newCategory + '.json')
  ]);
    return {ok:true}
  } catch (error) {
    return { ok: false, e: error };
  }

 
}


// ...?limit=10&page=1
// ...?limit=10&page=2
// ...?limit=10&page=3
export const getProductsByCategory = async (req, res) => {
  try {
    
    const limit = +req.query.limit
    const page = +req.query.page

    const product = await getFile('datas', 'products', 'test.json');
    const productData = await Promise.all(product.data.map(async ({ id, email }) => {
      const link = getLink('datas', 'users', email, 'products', id + '.json');
      const fileContent = await fs.readFile(link, 'utf8');
      const parsedData = JSON.parse(fileContent);
      return parsedData;
    }));

    const totalPages = Math.ceil(product.data.length / limit);
    const start = (page - 1) * limit;
    const end = limit + start; 

    const productDataFiltered = productData.slice(start, end);

    return res.status(200).json(getSuccessReq({ total: totalPages, products: productDataFiltered }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }
}
//[1,2,3,4,5,6,7,8,9,10].slice(5,10) // 6 - 10
//[1,2,3,4,5,6,7,8,9,10].slice(0,5) // 1 - 5

// page 1  
// limit = 10
// products = 100  



// { "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8", "email": "koichevalada@gmail.com" }