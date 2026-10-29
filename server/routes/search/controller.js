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
    if (index === -1) return { ok: false }
    oldCategData.splice(index, 1);
    const itemToMove = oldCategData[index];
    newCategData.push(itemToMove);
    const res = await Promise.all([
      setFileJSON(oldCategData, 'datas', 'products', oldCategory + '.json'),
      setFileJSON(newCategData, 'datas', 'products', newCategory + '.json')
    ]);
    return { ok: true }
  } catch (error) {
    return { ok: false, e: error };
  }


}

// {limit : 10, page : 1}


export const getProductsByCategory = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit; //10
  const category = req.query.category;
  let start = (page - 1) * limit;
  let end = start + limit;
  

  


  try {
    const getProductsByCateg = await getFile('datas', 'products', category + '.json');
    console.log(category,limit,page)

    /*{
    "id": "f99caba6-59f2-4024-8b6d-74a17b031095", айди продукта
    "email": "koichevalada@gmail.com" ,
  },
  {
    "email": "wedfr@gmail.com",
    "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8"
  }*/



    const getProducts = await Promise.all(getProductsByCateg.data
      .slice(start, end)
      .map(async (p) => {

        const link = getLink('datas', 'users', p.email, 'products', p.id + '.json');
        const res = await fs.readFile(link);
        const parsedData = JSON.parse(res);



        return parsedData;
      }

      )

    );

    const isNext = end < getProductsByCateg.data.length



    return res.status(200).json(getSuccessReq({ products: getProducts, index: 0, isNext }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }




}



export const searchForMatch = async ({ id, email }, search) => {
  try {
    const link = getLink('datas', 'users', email, 'products', id + '.json')
    const searchValue = search.trim().toLowerCase();
    const res = await fs.readFile(link);




    const parsedData = JSON.parse(res);

    if (parsedData.name
      .toLowerCase()
      .includes(searchValue)) return parsedData;


  } catch (error) {
    return null;
  }




}






export const getProductsByCategoryForSearch = async (req, res) => {

  const limit = +req.query.limit; //10
  let startSearch = +req.query.next || 0;
  let endSearch = startSearch + (limit * 3);
  const productNameSearch = req.query.search;
  const category = req.query.category




  try {
    const getProductsByCateg = await getFile('datas', 'products',category+ '.json');

    /*{
    "id": "f99caba6-59f2-4024-8b6d-74a17b031095", айди продукта
    "email": "koichevalada@gmail.com" ,
  },
  {
    "email": "wedfr@gmail.com",
    "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8"
  }*/


    const productsMatch = [];
    let isFinish = true
    let lastIndexProduct = null;



    while (isFinish) {


      const products = getProductsByCateg.data.slice(startSearch, endSearch);
      
      if (products.length === 0) isFinish = false;

      await Promise.all(
        products.map(async (p, i) => {
          if (productsMatch.length >= limit) return
          const res = await searchForMatch({ id: p.id, email: p.email }, productNameSearch);
          if (productsMatch.length >= limit) return
          
          if (res) productsMatch.push(res);
          if (productsMatch.length >= limit) {
            isFinish = false;
            lastIndexProduct = startSearch + i + 1;
          
          }

        })


      )
      startSearch = endSearch;
      endSearch += limit * 3;

    }

    console.log(productsMatch.length,'productsMatch')
    // const total = Math.ceil(productsMatch.length / limit);

    return res.status(200).json(getSuccessReq({ index: lastIndexProduct, products: productsMatch, isNext: !!lastIndexProduct }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }




}


export const getAllProductsForSearch = async (req, res) => {

  const limit = +req.query.limit; //10
  let startSearch = +req.query.next || 0;
  let endSearch = startSearch + (limit * 3);
  const productNameSearch = req.query.search;
  




  try {
    const getProductsByCateg = await getFile('datas', 'products-all', 'test.json');

    /*{
    "id": "f99caba6-59f2-4024-8b6d-74a17b031095", айди продукта
    "email": "koichevalada@gmail.com" ,
  },
  {
    "email": "wedfr@gmail.com",
    "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8"
  }*/


    const productsMatch = [];
    let isFinish = true
    let lastIndexProduct = null;

    while (isFinish) {


      const products = getProductsByCateg.data.slice(startSearch, endSearch);
      if (products.length === 0) isFinish = false;

      await Promise.all(
        products.map(async (p, i) => {
          if (productsMatch.length >= limit) return
          
          const res = await searchForMatch({ id: p.id, email: p.email }, productNameSearch);
          if (productsMatch.length >= limit) return

          if (res) productsMatch.push(res);
          if (productsMatch.length >= limit) {
            isFinish = false;
            lastIndexProduct = startSearch + i;

          }

        })


      )
      startSearch = endSearch;
      endSearch += limit * 3;

    }


    // const total = Math.ceil(productsMatch.length / limit);

    return res.status(200).json(getSuccessReq({ index: lastIndexProduct, products: productsMatch, isNext: !!lastIndexProduct }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error));
  }




}

// ...?limit=10&page=1
// ...?limit=10&page=2
// ...?limit=10&page=3

//[1,2,3,4,5,6,7,8,9,10].slice(5,10) // 6 - 10
//[1,2,3,4,5,6,7,8,9,10].slice(0,5) // 1 - 5

// page 1  
// limit = 10
// products = 100  



// { "id": "901e4618-4c58-406d-8505-f1e3e2ab8dd8", "email": "koichevalada@gmail.com" }

//getProductsByCategory
//getProductsByCategoryForSearch



