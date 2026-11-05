import mysql from 'mysql2/promise'
const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password : ''
}


const DB = mysql.createPool({
  ...config,
  database: 'marketpalce',
  waitForConnections : true
})

export const initDatabase = async () => {
  const connect = await mysql.createConnection(config)

  try {
    await connect.query(`
        CREATE DATABASE IF NOT EXISTS marketpalce
      `)
  } catch (e) {
    
  }
  await connect.end();

  await DB.query(`
      CREATE TABLE IF NO EXISTS users (
      email VARCHAR(255) NO NULL UNIQUE,
      PASSWORD VARCHAR(255) NO NULL,
      id INT AUTO_INCREMENT PRIMARY KEY 
      role VARCHAR(50)
      )
    `)
  
  console.log('create table and db')

}