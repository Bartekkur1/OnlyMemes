import { DataClientError, type DataClient } from "../types";
import { loadConfig } from "../../Infrastructure/config";
import { knex, Knex } from 'knex';
import { v4 } from 'uuid';
import { Transactional } from "../../Types/Content";

interface SQLClientConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export default class SQLClient extends Transactional implements DataClient {

  private config: SQLClientConfig;
  private transactions: Record<string, Knex.Transaction> = {};
  query: knex.Knex;

  constructor() {
    super();
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

  // Destroy the connection
  async pepsi() {
    await this.query.destroy();
  }

  /**
   * @returns Transaction id, transactions are stored in this instance at this.transactions property
   */
  async createTransaction(): Promise<string> {
    const transactionId = v4();
    const transaction = await this.query.transaction();
    this.transactions[transactionId] = transaction;
    return transactionId;
  }

  getTransaction(id: string): Knex.Transaction {
    if (!this.transactions[id]) {
      throw new DataClientError('Transaction not found!');
    }

    return this.transactions[id];
  }

  async commitTransaction(id: string): Promise<void> {
    const transaction = this.getTransaction(id);
    await transaction.commit();
    delete this.transactions[id];
  }

  async rollbackTransaction(id: string) {
    const transaction = this.getTransaction(id);
    await transaction.rollback();
    delete this.transactions[id];
  }
}