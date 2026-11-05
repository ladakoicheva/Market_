import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js";
import { setFileDirJSON, getAllFiles,getFile } from "../../utils/fs.js";


export const addToHistory = async (req, res) => {
  try {
    const date = Date.now();
    const email = req.user.email;
    const data = { ...req.body, date };

    const resFs = await setFileDirJSON(data, date + '.json', 'datas', 'users', email, 'history');

    if (resFs.ok) {
      return res.status(200).json(getSuccessReq(data));
    }

    return res.status(400).json(getErrorReq("Failed to save file"));
  } catch (error) {
    return res.status(500).json(getErrorReq(error.message));
  }
};

export const getAllHistory = async (req, res) => {
  try {
    const email = req.user.email;
    const page = +req.query.page
    const limit = +req.query.limit

    let start = (page - 1) * limit;
    let end = start + limit;

    
    const allFiles = await getAllFiles('datas', 'users', email, 'history');

   
  

    const paginatedHistory = allFiles.data.slice(start, end);

    const isNext = end < allFiles.data.length;
    console.log(end, limit, isNext);

    return res.status(200).json(getSuccessReq({ products: paginatedHistory, isNext, index:0 }));

  } catch (error) {
    return res.status(500).json(getErrorReq(error.message));
  }
};

export const getHistoryItem = async (req, res) => {
  try {
    const email = req.user.email;
    const id = req.params.id;


    const file = await getFile('datas', 'users', email, 'history', id + '.json');
  
  

    return res.status(200).json(getSuccessReq(file.data));

  } catch (error) {
    return res.status(500).json(getErrorReq(error.message));
  }
};