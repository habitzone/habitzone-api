import { config } from 'dotenv';

config();

function ensure(key: string) {
  let value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} environment variable.`);
  }
  return value;
}

export let env = {
  nodeEnv: ensure('NODE_ENV'),
  port: +ensure('PORT'),
  JWT_SECRET: ensure('JWT_SECRET'),
  database: {
    host: ensure('POSTGRES_HOST'),
    port: +ensure('POSTGRES_PORT'),
    database: ensure('POSTGRES_DB'),
    user: ensure('POSTGRES_USER'),
    password: ensure('POSTGRES_PASSWORD'),
  },
};
