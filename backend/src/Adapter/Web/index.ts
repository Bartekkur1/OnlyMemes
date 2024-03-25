import type { ApplicationContext } from "../../Application/types";
import ContentHandler from "./Handlers/ContentHandler";
import HealthCheck from "./Handlers/HealthCheck";
import IdentityHandler from "./Handlers/IdentityHandler";
import WebServer from "./WebServer";
import Routes from "./routes";
import { requireAuth } from './Middleware/requireAuth';
import ProfileHandler from "./Handlers/ProfileHandler";

// @TODO: Find a way to clean this up
export const createWebModule = (applicationContext: ApplicationContext) => {
  const server = new WebServer();
  const healthCheck = new HealthCheck();
  const identityHandler = new IdentityHandler(applicationContext.identity);
  const contentHandler = new ContentHandler(applicationContext.content);
  const profileHandler = new ProfileHandler(applicationContext.profile);

  server.registerRoutes(router => {
    router.get(Routes.health, healthCheck.handler.bind(healthCheck));
    // IDENTITY
    router.post(Routes.login, identityHandler.login.bind(identityHandler));
    router.post(Routes.register, identityHandler.register.bind(identityHandler));
    // CONTENT
    router.post(Routes.content, requireAuth, contentHandler.uploadContent.bind(contentHandler));
    router.get(Routes.content, requireAuth, contentHandler.getMemesHomepage.bind(contentHandler));
    // PROFILE
    router.get(Routes.profile, requireAuth, profileHandler.findUser.bind(profileHandler));
  });

  return server;
};
