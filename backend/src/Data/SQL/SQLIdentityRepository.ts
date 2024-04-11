import { IdentityRepository, RegisterForm, UserIdentity } from "../../Types/Identity";
import SQLClient from "./SQLClient";

export default class SQLIdentityRepository implements IdentityRepository {

  constructor(private client: SQLClient) { }

  findUserInviteToken(userId: number): Promise<string> {
    return this.client.query('InviteToken')
      .select('token')
      .where('owner', userId)
      .then(rows => rows[0].token);
  }

  async useInviteToken(token: string): Promise<void> {
    await this.client.query('InviteToken')
      .decrement('invites', 1)
      .where('token', token);
  }

  isInviteTokenValid(token: string): Promise<boolean> {
    return this.client.query('InviteToken')
      .select('*')
      .where('token', token)
      .then(rows => rows.length > 0 && rows[0].invites > 0);
  }

  userInviteTokenExists(userId: number): Promise<boolean> {
    return this.client.query('InviteToken')
      .select('*')
      .where('owner', userId)
      .then(rows => rows.length > 0);
  }

  saveInviteToken(userId: number, token: string): Promise<void> {
    return this.client.query('InviteToken')
      .insert({ owner: userId, token, invites: 5 });
  }

  findUserBydId(id: number): Promise<UserIdentity | undefined> {
    return this.client.query('User')
      .select('id', 'email', 'password', 'display_name')
      .where('id', id)
      .then((rows) => {
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
      });
  }

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

  registerUser(form: RegisterForm): Promise<void> {
    const { email, password, displayName, inviteToken } = form;
    return this.client.query('User')
      .insert({ email, password, display_name: displayName, inviteToken });
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