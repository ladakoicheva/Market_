import mysql from 'mysql2/promise';
import { DB, config } from './index.js';



export const initDatabase = async () => {
  const connect = await mysql.createConnection(config)

  try {
    await connect.query(`
      CREATE DATABASE IF NOT EXISTS marketpalce
      `)
  } catch (e) {

  } finally {
    await connect.end();
  }


  await DB.query(`
      CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      id INT AUTO_INCREMENT PRIMARY KEY,
      role ENUM('user', 'admin', 'client', 'seller')
      )
    `)

  


  
  await DB.query(`
      CREATE TABLE IF NOT EXISTS products (
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      inStock BOOLEAN NOT NULL,
      id INT AUTO_INCREMENT PRIMARY KEY,
      owner VARCHAR(255) NOT NULL,
      CONSTRAINT fk_user_products
        FOREIGN KEY (owner) REFERENCES users(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      )
    `)

  


  console.log('create table and db')

}




