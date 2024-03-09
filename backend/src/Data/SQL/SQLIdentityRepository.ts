import type { Credentials, IdentityRepository, UserIdentity } from "../../Application/Identity/types";
import SQLClient from "./SQLClient";

export default class SQLIdentityRepository implements IdentityRepository {

  constructor(private client: SQLClient) { }

  findUser(email: string): Promise<UserIdentity> {
    const query = 'SELECT email, password, display_name FROM "user" WHERE email = $1';
    return this.client.query(query, [email])
      .then(result => {
        const user = result[0];
        return {
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
    const query = 'INSERT INTO "user" (email, password, display_name) VALUES ($1, $2, $3)';
    const { email, password } = credentials.credentials;
    const { displayName } = credentials.profile;
    return this.client.query(query, [email, password, displayName]);
  }

  isEmailTaken(email: string): Promise<boolean> {
    const query = 'SELECT COUNT(*) FROM "user" WHERE email = $1';
    return this.client.query(query, [email])
      .then(result => {
        return result[0].count > 0;
      });
  }
}