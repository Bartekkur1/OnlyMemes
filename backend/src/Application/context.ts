import SQLClient from "../Data/SQL/SQLClient";
import SQLContentRepository from "../Data/SQL/SQLContentRepository";
import SQLIdentityRepository from "../Data/SQL/SQLIdentityRepository";
import SQLProfileRepository from "../Data/SQL/SQLProfileRepository";
import Discord from "../Infrastructure/ContentStore/discord";
import Content from "./Content/Content";
import Follow from "./Follow/Follow";
import Identity from "./Identity/Identity";
import Profile from "./Profile/Profile";
import type { ApplicationContext } from "./types";

const createSQLBasedApplicationContext = (): ApplicationContext => {
  const sqlClient = new SQLClient();
  const contentStore = new Discord();

  const identityRepository = new SQLIdentityRepository(sqlClient);
  const contentRepository = new SQLContentRepository(sqlClient);

  return {
    identity: new Identity(identityRepository),
    content: new Content(contentStore, contentRepository, identityRepository),
    profile: new Profile(new SQLProfileRepository(sqlClient)),
    follow: new Follow()
  }
};

export default createSQLBasedApplicationContext;
