import { DataClientError, type DataClient } from "../types";
import { loadConfig } from "../../Infrastructure/config";
import { knex } from 'knex';

interface SQLClientConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export default class SQLClient implements DataClient {

  private config: SQLClientConfig;
  query: knex.Knex;

  constructor() {
    this.config = loadConfig<SQLClientConfig>({
      host: 'POSTGRES_HOST',
      port: 'POSTGRES_PORT',
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      database: 'POSTGRES_DATABASE'
    });

    this.query = knex({
      client: 'pg',
      connection: {
        ...this.config
      },
      pool: {
        min: 0,
        max: 10
      }
    });
  }

  async init() {
    try {
      await this.query.raw('SELECT 1');
    } catch (err) {
      throw new DataClientError('Database connection failed!');
    }
  }
}