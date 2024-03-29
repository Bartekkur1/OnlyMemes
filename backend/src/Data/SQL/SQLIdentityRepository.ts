import { IdentityRepository, UserIdentity } from "../../Types/Identity";
import SQLClient from "./SQLClient";

export default class SQLIdentityRepository implements IdentityRepository {

  constructor(private client: SQLClient) { }

  findUser(email: string): Promise<UserIdentity | undefined> {
    return this.client.query('User')
      .select('id', 'email', 'password', 'display_name')
      .where('email', email)
      .then(rows => {
        if (rows.length === 0) return undefined;

        const user = rows[0];
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
      })
  }

  createUser(credentials: UserIdentity): Promise<void> {
    const { email, password } = credentials.credentials;
    const { displayName } = credentials.profile;
    return this.client.query('User')
      .insert({ email, password, display_name: displayName });
  }

  isEmailTaken(email: string): Promise<boolean> {
    return this.client.query('User')
      .count('*')
      .where('email', email)
      .then(rows => {
        return Number(rows[0].count) > 0
      })
  }
}