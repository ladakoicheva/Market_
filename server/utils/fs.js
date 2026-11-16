import path from 'path'
import fs from 'node:fs/promises'
import { __dirname,MINIMAZE } from '../path.js';
import { unlink } from 'node:fs/promises';
import { getErrorReq ,getSuccessReq} from './responseHelpers.js';
import { readdir } from 'node:fs/promises';
// const path = require('path')
// const fs = require('fs').promises

export const getLink = (...url) => path.join(__dirname, ...url);


export const deleteFile = async (...url) => {

  const link = getLink(...url);
  try {
    await unlink(link);
    return getSuccessReq(null)
  } catch (error) {
    return getErrorReq(error)
  }
}


export const getFile = async (...url) => {
  try {
    const link = getLink(...url)
    const length = url.length - 1;
    const filename = url[length]
    const data = await fs.readFile(link, 'utf8');
    if (filename.includes('.json')) return  getSuccessReq( JSON.parse(data))
    return getSuccessReq(data)
  } catch (error) {
    return getErrorReq(error)
  }
}

export const readDir = async (...url) => {
  try {
    const link = getLink(...url)

    const data = await fs.readdir(link);
    return getSuccessReq(data)

  } catch (error) {
    return getErrorReq(error)
  }
}


export const setFileJSON = async (data, ...url) => {
  try {
    const link = getLink(...url);

    await fs.writeFile(link, JSON.stringify(data, null, MINIMAZE), 'utf8')
    return getSuccessReq(data)
  } catch (error) {
    return getErrorReq(error)
  }
}

export const setFileDirJSON = async (data, fileName, ...url) => {
  try {
    const linkFolder = getLink(...url);
    const link = linkFolder + '/' + fileName;

    await fs.mkdir(linkFolder, { recursive: true })
    await fs.writeFile(link, JSON.stringify(data, null, MINIMAZE), 'utf8')
    return  getSuccessReq(data)
  } catch (error) {
    return getErrorReq(error)
  }
}
export const getAllFiles = async (...url) => {
  try {
    const link = getLink(...url); // link to folder 
  
    const filesList = await readdir(link);

    const filesData = await Promise.all(filesList.map(async (el) => JSON.parse(await fs.readFile(link + '/' + el, 'utf8'))));
    
    
    return getSuccessReq(filesData)
    
   
    // await fs.mkdir(linkFolder, { recursive: true })
    // await fs.writeFile(link, JSON.stringify(data, null, MINIMAZE), 'utf8')
    // return  getSuccessReq(data)
  } catch (error) {
    return getErrorReq(error)
  }
}




//getData('data', 'data.json')
// const getLink = (url) => path.join(__dirname, 'data', 'data.json');

// console.log(await readDirJSON('users'))