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
    router.post(Routes.verify, identityHandler.verifyToken.bind(identityHandler));
    router.get(Routes.getToken, requireAuth, identityHandler.getInviteToken.bind(identityHandler));
    // CONTENT
    router.post(Routes.content, requireAuth, contentHandler.uploadContent.bind(contentHandler));
    router.get(Routes.content, requireAuth, contentHandler.findMemes.bind(contentHandler));
    router.delete(Routes.contentId, requireAuth, contentHandler.deleteMeme.bind(contentHandler));
    router.patch(Routes.approve, requireAuth, contentHandler.approveMeme.bind(contentHandler));
    router.delete(Routes.approve, requireAuth, contentHandler.disableMeme.bind(contentHandler));
    router.post(Routes.upvote, requireAuth, contentHandler.upVote.bind(contentHandler));
    router.post(Routes.downvote, requireAuth, contentHandler.downVote.bind(contentHandler));
    // PROFILE
    router.get(Routes.profile, requireAuth, profileHandler.findUser.bind(profileHandler));
  });

  return server;
};
