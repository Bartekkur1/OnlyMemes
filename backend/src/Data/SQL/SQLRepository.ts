import { Transactional } from "../../Types/Content";
import SQLClient from "./SQLClient";

export class SQLRepositoryBase extends Transactional {

  constructor(protected client: SQLClient) {
    super();
  }

  createTransaction(): Promise<string> {
    return this.client.createTransaction();
  }
  commitTransaction(id: string): Promise<void> {
    return this.client.commitTransaction(id);
  }
  rollbackTransaction(id: string): Promise<void> {
    return this.client.rollbackTransaction(id);
  }

}