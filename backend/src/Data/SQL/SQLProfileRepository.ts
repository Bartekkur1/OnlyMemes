import { ProfileRepository, UserProfile } from "../../Types/Profile";
import SQLClient from "./SQLClient";

export default class SQLProfileRepository implements ProfileRepository {

  constructor(private client: SQLClient) { }

  findUser(displayName: string): Promise<UserProfile | null> {
    return this.client.query('User')
      .select('User.*')
      .from('User')
      .where('User.display_name', '=', displayName)
      .then(rows => {
        if (rows.length === 0) {
          return null;
        }
        const row = rows[0];
        return <UserProfile>{
          id: row.id,
          displayName: row.display_name
        }
      });
  }

}