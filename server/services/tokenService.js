import { deleteFile, setFileDirJSON,getFile,setFileJSON  } from "../utils/fs.js";
import { getLiveToken } from "../utils/authHelpers.js";
import { getErrorReq,getSuccessReq } from "../utils/responseHelpers.js";




export const deleteToken = async (token) => {
  try {
    return await deleteFile('datas','tokens', token + '.json');
  } catch (e) {
    return getErrorReq(e);
  }
};

export const getFileToken = async (token) => {
  try {
   
    return await getFile('datas','tokens', token + '.json');
  } catch (error) {
    return getErrorReq(error);
  }
};

export const generateFileTokens = async (token, email) => {
  try {
    const data = { email, date: getLiveToken() };
    await setFileDirJSON(data, token + '.json', 'datas', 'tokens');
    return  getSuccessReq(token)
  } catch (error) {
    return getErrorReq(error);
  }
};

export const setFileToken = async (token,data) => {
  try {
    
    return await setFileJSON(data,'datas', 'tokens',token + '.json');
  } catch (error) {
    return getErrorReq(error);
  }
}


