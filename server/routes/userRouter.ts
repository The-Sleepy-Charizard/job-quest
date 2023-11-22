import express, {Request, Response} from 'express';
import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts';

const router = express.Router();

router.post('/signup', userController.signup, cookieController.createCookie, (_req: Request, res: Response) => {
  return res.status(201).json({ message: 'registration successful' });
})

router.post('/login', userController.login, cookieController.createCookie, (_req: Request, res: Response) => {
  return res.status(202).json({ message: 'login successul' });
})

router.get('/verify', cookieController.verifyCookie, (_req: Request, res: Response) => {
  return res.status(202).json({ message: 'valid cookie' })
})

export {router as userRouter};