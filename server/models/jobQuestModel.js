import { Pool } from 'pg'
import 'dotenv/config'

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

export default db