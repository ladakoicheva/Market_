import mysql from 'mysql2/promise';


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

