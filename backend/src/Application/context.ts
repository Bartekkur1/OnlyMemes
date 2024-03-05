import SQLIdentityRepository from "../Data/SQL/SQLIdentityRepository";
import Identity from "./Identity/Identity";
import type { ApplicationContext } from "./types";

const createSQLBasedApplicationContext = (): ApplicationContext => {
  return {
    identity: new Identity({ JWTSecret: 'TODO' }, new SQLIdentityRepository())
  }
};

export default createSQLBasedApplicationContext;
