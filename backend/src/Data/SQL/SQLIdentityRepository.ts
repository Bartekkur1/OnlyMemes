import type { Credentials, IdentityRepository, UserIdentity } from "../../Application/Identity/types";
import SQLClient from "./SQLClient";

export default class SQLIdentityRepository implements IdentityRepository {

  constructor(private client: SQLClient) { }

  findUser(credentials: Credentials): Promise<UserIdentity> {
    throw new Error("Method not implemented.");
  }
  createUser(credentials: UserIdentity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isEmailTaken(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}