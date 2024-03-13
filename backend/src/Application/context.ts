import SQLClient from "../Data/SQL/SQLClient";
import SQLContentRepository from "../Data/SQL/SQLContentRepository";
import SQLIdentityRepository from "../Data/SQL/SQLIdentityRepository";
import ImgBB from "../Infrastructure/ContentStore/Imgbb";
import Content from "./Content/Content";
import Identity from "./Identity/Identity";
import type { ApplicationContext } from "./types";

const createSQLBasedApplicationContext = (): ApplicationContext => {
  const sqlClient = new SQLClient();
  const contentStore = new ImgBB();

  return {
    identity: new Identity(new SQLIdentityRepository(sqlClient)),
    content: new Content(contentStore, new SQLContentRepository(sqlClient))
  }
};

export default createSQLBasedApplicationContext;
