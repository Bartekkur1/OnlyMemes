import type { ContentRepository, IdentityRepository, Meme } from "../../Application/Identity/types";
import type SQLClient from "./SQLClient";


export default class SQLContentRepository implements ContentRepository {

  constructor(private client: SQLClient) { }

  deleteMeme(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async saveMeme(meme: Meme): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
