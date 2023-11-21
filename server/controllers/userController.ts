import bcrypt from 'bcrypt';
import { pool } from '../models/jobQuestModel.ts';
import { Request, Response, NextFunction} from 'express'
const userController = {
  login: async (req: Request, _res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        log: 'userController.signup: ERROR: missing username or password',
        status: 400,
        message: { err: 'Username and password required' },
      });
    }
    try {
      // Compares req.body password with the User document's password (returns boolean)
      const user = [username];
      const loginQuery:string = 'SELECT * FROM accounts WHERE username = $1';
      const foundUser = await pool.query(loginQuery, user);
      // console.log('user password: ', foundUser.rows[0].password);
      const result = await bcrypt.compare(password, foundUser.rows[0].password);
      if (!result) {
        return next({
          log: 'userController.login: ERROR: invalid password',
          status: 401,
          message: { err: 'Invalid username or password' },
        });
      } else {
        return next();
      }
  }
     catch (err) {
      return next({
        log: `userController.login: ERROR: ${err}`,
        message: { err: 'Something went wrong! Whoops!' },
        status: 500,
      });
    }
},


//   Signup Controller
  signup: async (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  // Confirms req.body includes username and password
  if (!username || !password) {
    return next({
      log: 'userController.signup: ERROR: missing username or password',
      status: 400,
      message: { err: 'Username and password required' },
    });
  }
  
  try {
    // Creating table of user if userlist is not exist at the beginning
    // await pool.query(`CREATE TABLE IF NOT EXISTS accounts ( 
    //   user_id SERIAL PRIMARY KEY ,
    //   username VARCHAR(20) UNIQUE NOT NULL,
    //   password VARCHAR NOT NULL,
    //  )`);
    // Hashes password using Bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //adding user into the accounts table
    const createUser: string = `INSERT INTO accounts (user_id, username, password) VALUES (DEFAULT, $1, $2) returning user_id`;
    const values = [ username, hashedPassword ]
    await pool.query(createUser, values);
    //const newUser = 
    // console.log('newUser: ', newUser.rows[0].user_id);
    // res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next({
      log: `userController.signup: ERROR: ${err}`,
      message: { err: 'Username already exists' },
      status: 500,
    });
  }
}
};

export default userController;
