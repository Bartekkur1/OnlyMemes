import type { Credentials, IdentityRepository, UserIdentity } from "../../Application/Identity/types";
import SQLClient from "./SQLClient";

export default class SQLIdentityRepository implements IdentityRepository {

  constructor(private client: SQLClient) { }

  findUser(email: string): Promise<UserIdentity> {
    const query = 'SELECT id, email, password, display_name FROM "User" WHERE email = $1';
    return this.client.query(query, [email])
      .then(result => {
        const user = result[0];
        return {
          id: user.id,
          credentials: {
            email: user.email,
            password: user.password
          },
          profile: {
            displayName: user.display_name
          }
        };
      });
  }

  createUser(credentials: UserIdentity): Promise<void> {
    const query = 'INSERT INTO "User" (email, password, display_name) VALUES ($1, $2, $3)';
    const { email, password } = credentials.credentials;
    const { displayName } = credentials.profile;
    return this.client.query(query, [email, password, displayName]);
  }

  isEmailTaken(email: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) FROM "User" WHERE email = $1';
    return this.client.query(query, [email])
      .then(result => {
        return result[0].count > 0;
      });
  }
}