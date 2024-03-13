import { loadConfig } from "../../Infrastructure/config";
import { Pool } from 'pg';
import type { DataClient } from "../types";

interface SQLClientConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

class QueryError extends Error {
  constructor(message: string, public query: string, public params: any[]) {
    super(message);
  }
}

// @TODO: Implement query builder
export default class SQLClient implements DataClient {

  private config: SQLClientConfig;
  private pool: Pool;

  constructor() {
    this.config = loadConfig<SQLClientConfig>({
      host: 'POSTGRES_HOST',
      port: 'POSTGRES_PORT',
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      database: 'POSTGRES_DATABASE'
    });

    this.pool = new Pool({
      ...this.config,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }

  async init() {
    const client = await this.pool.connect();
    client.release();
  }

  async query(query: string, params: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      client.release();
      return result.rows;
    } catch (err) {
      client.release();
      const error = err as Error;
      throw new QueryError(error.message, query, params);
    }
  }

}