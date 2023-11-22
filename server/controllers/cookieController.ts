import { Request, Response, NextFunction } from 'express';
import { pool } from '../models/jobQuestModel.ts';

const cookieController = {
  createCookie: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = res.locals.user;
      res.cookie('user_id', user_id, {expires: new Date(Date.now() + 3600000), httpOnly: true})
      return next()
    } catch (err) {
      return next({
      log: `cookieController.createCookie: ${err}`,
      message: { err: 'error in creating cookie' },
      status: 400,
      });
    }
  },
   
  verifyCookie: async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { username } = req.query;
      const array = [req.cookies.user_id, username]
      const cookieQuery:string = 'SELECT * FROM accounts WHERE user_id = $1 AND username = $2;';
      await pool.query(cookieQuery, array);
      return next()
    } catch (err) {
      return next({
        log: `cookieController.verifyCookie: ${err}`,
        message: { err: 'cookie is not valid' },
        status: 401,
      });
    }
  },
};

export default cookieController