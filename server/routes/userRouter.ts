import express, {Request, Response} from 'express';
import userController from '../controllers/userController.ts';

const router = express.Router();

router.post('/signup', userController.signup, (_req: Request, res: Response) => {
  return res.status(201).json({ message: 'registration successful' });
})

router.post('/login', userController.login, (_req: Request, res: Response) => {
  return res.status(202).json({ message: 'login successul' });
})

export {router as userRouter};