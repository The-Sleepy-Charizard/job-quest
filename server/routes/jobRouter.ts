import express, { Router } from 'express';
import { Request, Response } from 'express';
import jobController from '../controllers/jobController.ts';

// import jobController from '../controllers/jobController';

const router: Router = express.Router();


router.get('/', jobController.getJobs, (_req: Request, res: Response) => {
  return res.status(200).json(res.locals.jobs);
});

router.post('/', jobController.postJob, (_req: Request, res: Response) => {
  return res.status(202).json({ message: 'Job Successully Added' });
});

// router.patch('/', jobController.updateJob, (_req: Request, res: Response) => {
//     return res.status(202).json({ message: 'Job Updated Successully ' });
// })

// router.delete('/', jobController.deleteJob, (_req: Request, res: Response) => {
//     return res.status(202).json({ message: 'Job Deleted Successully ' });
// })


export {router as jobRouter}