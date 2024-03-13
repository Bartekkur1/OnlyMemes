import SQLClient from "../Data/SQL/SQLClient";
import SQLIdentityRepository from "../Data/SQL/SQLIdentityRepository";
import Identity from "./Identity/Identity";
import type { ApplicationContext } from "./types";

const createSQLBasedApplicationContext = (): ApplicationContext => {
  const sqlClient = new SQLClient();

  return {
    identity: new Identity(new SQLIdentityRepository(sqlClient))
  }
};

export default createSQLBasedApplicationContext;
