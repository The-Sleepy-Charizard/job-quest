import bcrypt from 'bcrypt';
import db from '../models/jobQuestModel';
import { Request, Response, NextFunction} from 'express'
const userController = {





//Login Controller 

// userController.login = async (req, res, next) => {
//   const { username, password } = req.body;
//   // Confirms req.body includes username and password
//   if (!username || !password) {
//     return next({
//       log: 'userController.createUser: ERROR: missing username or password',
//       status: 400,
//       message: { err: 'Username and password required' },
//     });
//   }
//   try {
//     if (!user) {
//       return next({
//         log: 'userController.login: ERROR: unable to find user in database',
//         status: 401,
//         message: { err: 'Invalid username or password' },
//       });
//     }
//     // Compares req.body password with the User document's password (returns boolean)
//     const result = await bcrypt.compare(password, user.password);
//     if (!result) {
//       return next({
//         log: 'userController.login: ERROR: invalid password',
//         status: 401,
//         message: { err: 'Invalid username or password' },
//       });
//     } else {
//       // Stores user object to res.locals.user
//       res.locals.user = user;
//       return next();
//     }
//   } catch (err) {
//     return next({
//       log: `userController.login: ERROR: ${err}`,
//       message: { err: 'Something went wrong! Whoops!' },
//       status: 500,
//     });
//   }
// };


//   Signup Controller


  signup: async (req: Request, res: Response, next: NextFunction) => {
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
    await db.query(`CREATE TABLE IF NOT EXIST accounts ( 
      user_id SERIAL PRIMARY KEY ,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
     )`);
    // Hashes password using Bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //adding user into the accounts table
    const createUser: string = `INSERT INTO accounts (user_id, username, password) VALUES (DEFAULT, $1, $2)`;
    const values = [ username, hashedPassword ]
    const newUser = await db.query(createUser, values);
    // Saves new user object to res.locals.user
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next({
      log: `userController.signup: ERROR: ${err}`,
      message: { err: 'Something went wrong! Whoops!' },
      status: 500,
    });
  }
}
};

export default userController;
