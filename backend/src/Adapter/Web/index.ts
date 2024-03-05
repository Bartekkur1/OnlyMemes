import type { ApplicationContext } from "../../Application/types";
import HealthCheck from "./Handlers/HealthCheck";
import IdentityHandler from "./Handlers/IdentityHandler";
import WebServer from "./WebServer";
import Routes from "./routes";

export const createWebModule = (applicationContext: ApplicationContext) => {
  const server = new WebServer({ port: 3000 });
  const healthCheck = new HealthCheck();
  const identityHandler = new IdentityHandler(applicationContext.identity);

  server.registerRoutes(router => {
    router.get(Routes.health, healthCheck.handler);
    router.post(Routes.login, identityHandler.login);
  });

  return server;
};
