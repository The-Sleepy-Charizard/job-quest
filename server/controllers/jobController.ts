import { pool } from '../models/jobQuestModel.ts';
import { Request, Response, NextFunction } from 'express';
const jobController = {
  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, filter } = req.query;
      let userQuery;
      let jobQuery: string;

      if (!filter) {
        userQuery = [username];
        jobQuery = 'SELECT * FROM joblist WHERE username = $1;';
      } else {
        userQuery = [username, filter];
        jobQuery =
          'SELECT * FROM joblist WHERE username = $1 AND section = $2;';
      }

      const allJobs = await pool.query(jobQuery, userQuery);
      console.log('all jobs: ', allJobs.rows);
      // const allJobs = 'testing'
      res.locals.jobs = allJobs.rows;
      return next();
    } catch (err) {
      return next({
        log: `jobController.getJobs: ${err}`,
        message: { err: 'Failed to get jobs' },
        status: 400,
      });
    }
  },

  postJob: async (req: Request, _res: Response, next: NextFunction) => {
    console.log('req.body in post job: ', req.body)
    const {
      applyDate,
      username,
      company,
      followDate,
      interest,
      location,
      position,
      salary,
      saveDate,
      section,
    } = req.body;
    const lowerCaseSection = section.toLowerCase();
    const values: string[] = [
      applyDate,
      username,
      company,
      followDate,
      interest,
      location,
      position,
      salary,
      saveDate,
      lowerCaseSection,
    ];

    try {
      const jobPostQuery = `INSERT INTO joblist (job_id, apply_date, username, company, follow_date, interest, location, position, salary, save_date, section) 
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
      const allJobs = await pool.query(jobPostQuery, values);
      console.log('all jobs: ', allJobs.rows)
      return next();
    } catch (err) {
      return next({
        log: `jobController.postJob: ${err}`,
        message: { err: 'Failed to add job' },
        status: 400,
      });
    }
  },

  // updateJob: async (req: Request, _res: Response, next: NextFunction) => {
  //   // const {
  //   //  job_id,
  //   //  applyDate,
  //   //  username,
  //   //  company,
  //   //  followDate,
  //   //  interest,
  //   //  location,
  //   //  position,
  //   //  salary,
  //   //  saveDate,
  //   //  section,
  //   //  } = req.body;
  //   const { username } = req.body;

  //   //  const values:string[] = [
  //   //    job_id,
  //   //    applyDate,
  //   //    username,
  //   //    company,
  //   //    followDate,
  //   //    interest,
  //   //    location,
  //   //    position,
  //   //    salary,
  //   //    saveDate,
  //   //    section,
  //   //  ];

  //   try {
  //     const jobDataQuery = `SELECT job_id FROM joblist WHERE username = $1;`;
  //     const jobFromDB = await pool.query(jobDataQuery, [username]);
  //     console.log(jobFromDB);
  //     //  const jobUpdateQuery = `UPDATE joblist (job_id, apply_date, username, company, follow_date, interest, location, position, salary, save_date, section)
  //     //  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  //     //  await pool.query(jobUpdateQuery, values);
  //   } catch (err) {
  //     return next({
  //       log: `jobController.postJob: ${err}`,
  //       message: { err: 'Failed to add job' },
  //       status: 400,
  //     });
  //   }
  // },

  deleteJob: async (req: Request, _res: Response, next: NextFunction) => {
    const { job_id } = req.query;
    try {
      const jobDataQuery = `DELETE FROM joblist WHERE job_id = $1;`;
      const job = await pool.query(jobDataQuery, [job_id]);
      console.log('job', job);
      return next();
    } catch (err) {
      return next({
        log: `jobController.postJob: ${err}`,
        message: { err: 'Failed to add job' },
        status: 400,
      });
    }
  },
};

export default jobController;
