import mysql from 'mysql2/promise';
// import { createUsersTable } from './users';

// { version: '26.10.0' } ]

export const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: ''
}


export const DB = mysql.createPool({
  ...config,
  database: 'marketpalce',
  waitForConnections: true
})

// export const initDatabase = async () => {
//   const connect = await mysql.createConnection(config)

//   try {
//     await connect.query(`
//         CREATE DATABASE IF NOT EXISTS marketpalce
//       `)
//   } catch (e) {

//   }
//   await connect.end();

//   await DB.query(`
//       CREATE TABLE IF NOT EXISTS users (
//       email VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL,
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       role ENUM('user', 'admin', 'client', 'sale')
//       )
//     `)

//   // await DB.query(`ALERT TABLE users 
//   //   RENAME COLUMN PASSWORD TO password`)
  
//   // console.log(v)
//  /// await DB.query('DROP TABLE IF EXISTS products')
//   await DB.query(`
//       CREATE TABLE IF NOT EXISTS products (
//       name VARCHAR(255) NOT NULL,
//       category VARCHAR(255) NOT NULL,
//       price DECIMAL(10, 2) NOT NULL,
//       inStock BOOLEAN NOT NULL,
//       id INT AUTO_INCREMENT PRIMARY KEY
//       )
//     `)


//   console.log('create table and db')

// }
// {
//   "name": "kkq",
//     "category": " CLOUTHING",
//       "price": 3,
//         "inStock": false,
//           "id": "791fa8e6-eb38-4cb8-b22d-460cfbed5ac5"
// }



const createProductDB = async (product) => {
  product = {

    name: "Samsung Ga",
    category: "CLOUTHING",
    price: 58,
    inStock: false,
  }

  

  // const res = await DB.execute(
  //   `INSERT INTO products(name, category, price, inStock)
  //    VALUES (?, ?, ?, ?)
  //   `,
  //   [product.name, product.category, product.price, product.inStock]
  // )

  console.log(res)
}
//createProductDB()



//getAllUsersDB()
//createUserDB()