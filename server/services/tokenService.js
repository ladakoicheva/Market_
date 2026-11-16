import { deleteFile, setFileDirJSON,getFile,setFileJSON  } from "../utils/fs.js";
import { getLiveToken } from "../utils/authHelpers.js";
import { createError } from "../utils/createError.js";

const unwrapResult = (result, message) => {
  if (!result.ok) throw createError(500, message);
  return result.data;
};

export const deleteToken = async (token) => {
  return unwrapResult(
    await deleteFile('datas','tokens', token + '.json'),
    'Failed to delete token'
  );
};

export const getFileToken = async (token) => {
  const result = await getFile('datas','tokens', token + '.json');
  if (!result.ok && result.e?.code === 'ENOENT') {
    throw createError(401, 'token is not valid');
  }
  return unwrapResult(result, 'Failed to read token');
};

export const generateFileTokens = async (token, email) => {
  const data = { email, date: getLiveToken() };
  unwrapResult(
    await setFileDirJSON(data, token + '.json', 'datas', 'tokens'),
    'Failed to create token'
  );
  return token;
};

export const setFileToken = async (token,data) => {
  return unwrapResult(
    await setFileJSON(data,'datas', 'tokens',token + '.json'),
    'Failed to update token'
  );
}
