import pg from 'pg'
import 'dotenv/config'

// create a new pool here using the connection string above
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

export const query = (
  text: string,
  params: Array<string | number | boolean>,
  callback: (error: Error, result: unknown) => void
) => pool.query(text, params, callback);

export { pool };