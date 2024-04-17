import { verify } from "jsonwebtoken";
import { loadConfig } from "../../../Infrastructure/config";
import type { AuthorizedRequest } from "../types";
import { Logger } from "../../../Util/types";
import { getConsoleLogger } from "../../../Util/logger";
import { JWTPayload } from '../../../Types/Identity';

interface AuthMiddlewareConfig {
  JWTSecret: string;
}

const config = loadConfig<AuthMiddlewareConfig>({
  JWTSecret: 'JWT_SECRET'
});

const authMiddlewareLogger: Logger = getConsoleLogger('AuthMiddleware');

export const requireAuth = (req: AuthorizedRequest, res, next) => {
  try {
    authMiddlewareLogger.debug('Checking for authorization token');
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
      authMiddlewareLogger.debug('No token found!');
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = tokenBearer.replace('Bearer ', '');
    authMiddlewareLogger.debug('Verifying token');
    verify(token, config.JWTSecret, {}, (err, decoded) => {
      if (err) {
        authMiddlewareLogger.debug('Token verification failed!');
        return res.status(401).json({ message: "Unauthorized" });
      }

      authMiddlewareLogger.debug('Token verified successfully!');
      const payload = decoded as JWTPayload;
      req.user = {
        id: payload.id,
        displayName: payload.displayName,
        role: payload.role
      }
    });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}