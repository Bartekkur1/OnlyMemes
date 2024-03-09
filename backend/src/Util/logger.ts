import type { Logger } from "./types";

const getLogPrefix = (name: string) => `[${name}] [${new Date().toISOString()}]`;

// @TODO: Add log levels filtering
export const getConsoleLogger = (name: string): Logger => {
  return {
    error(message) {
      console.error(`${getLogPrefix(name)} [ERROR] ${message}`);
    },
    debug(message) {
      console.debug(`${getLogPrefix(name)} [DEBUG] ${message}`);
    },
    info(message) {
      console.info(`${getLogPrefix(name)} [INFO] ${message}`);
    },
    warn(message) {
      console.warn(`${getLogPrefix(name)} [WARN] ${message}`);
    }
  }
};