import { DB } from "../index.js";




export const getUserDB = async (email) => {
  const [[user]] = await DB.execute(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email]
  );

  return user;
}





export const getAllUsersDB = async () => {

  const res = await DB.query(
    `SELECT * FROM users`
  )
  console.log(res)
}




export const createUserDB = async (user) => {
  // user = {
  //   email: 'use2r@gmail.com',
  //   password: 'weqqeqq',
  //   role: 'client'
  // }

  const [{ insertId }] = await DB.execute(
    `INSERT INTO users(email, password, role)
     VALUES (?, ?, ?)
    `,
    [user.email, user.password, user.role]
  );
  return {
    email: user.email,
    role: user.role,
    id: insertId
  };

}
