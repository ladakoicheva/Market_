import { getFile, setFileJSON ,setFileDirJSON} from "../utils/fs.js";
import { getSuccessReq, getErrorReq } from "../utils/responseHelpers.js";


//get one
export const getUserFile = async (email) => {
  try {
    const response = await getFile('datas', 'users', email, 'user.json');
    if (!response.ok) throw Error('no user')
    return getSuccessReq(response.data)
  } catch (e) {
    return getErrorReq(e)
  }
 


};




//write and create dir

export const setUsersFileDir = async (data, email) => {
  try {
    const response = await setFileDirJSON(data, 'user.json', 'datas', 'users', email);
    if (!response.ok) throw Error('failed to create user')
    return getSuccessReq(response.data)
  } catch (error) {
    return getErrorReq(error)
  }

  
 
};

//write
export const setUsersFile = async (data, email) => {
  try {
    const response = await setFileJSON(data, 'users', email, 'user.json');
    if (!response.ok) throw new Error('failed to create user')
    return getSuccessReq(response.data)
  } catch (error) {
    return getErrorReq(error)
  }



  
}



//get all

export const getAllUsers = async () => {
  try {
    const userList = await readDir('users');

    const users = await Promise.all(userList.data.map((u) => getUserFile(u)));
    
    return getSuccessReq(users)
  } catch (e) {
   return getErrorReq(e)
  }



}