import { createWebModule } from "./src/Adapter/Web";
import createSQLBasedApplicationContext from "./src/Application/context";

(async () => {
  const appContext = createSQLBasedApplicationContext();
  const webServer = createWebModule(appContext);
  webServer.start();
})();
