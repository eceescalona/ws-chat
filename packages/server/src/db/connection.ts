import { Client, Pool } from 'pg';

export interface Context {
  readonly db: Client;
}

export const createDbPool = () => {
  const pool = new Pool();

  pool.on('error', (err) => {
    console.error(err, 'Postgres pool idle client error.');
  });

  pool.on('connect', (client) => {
    client.on('error', (err) => {
      console.error(err, 'Postgres client error.');
    });
  });

  return pool;
};
