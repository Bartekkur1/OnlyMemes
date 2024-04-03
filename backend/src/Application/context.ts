import SQLClient from "../Data/SQL/SQLClient";
import SQLContentRepository from "../Data/SQL/SQLContentRepository";
import SQLIdentityRepository from "../Data/SQL/SQLIdentityRepository";
import SQLProfileRepository from "../Data/SQL/SQLProfileRepository";
import Discord from "../Infrastructure/ContentStore/discord";
import Content from "./Content/Content";
import Identity from "./Identity/Identity";
import Profile from "./Profile/Profile";
import type { ApplicationContext } from "./types";

const createSQLBasedApplicationContext = (): ApplicationContext => {
  const sqlClient = new SQLClient();
  const contentStore = new Discord();

  return {
    identity: new Identity(new SQLIdentityRepository(sqlClient)),
    content: new Content(contentStore, new SQLContentRepository(sqlClient)),
    profile: new Profile(new SQLProfileRepository(sqlClient))
  }
};

export default createSQLBasedApplicationContext;
