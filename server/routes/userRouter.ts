import express, {Request, Reponse} from 'express';
import userController from '../controllers/userController';
const router = express.Router();

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  return res.status(201).json({ message: 'registration successful' });
})

// router.post('/login', userController.login, (req, res) => {
//   return res.status(202).json({ message: 'login successul' });
// })

export {router as userRouter};