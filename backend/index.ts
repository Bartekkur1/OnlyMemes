import HealthCheck from "./src/Adapter/Web/Handlers/HealthCheck";
import WebServer from "./src/Adapter/Web/WebServer";

const webServer = new WebServer({ port: 3000 });
webServer.addHandler(HealthCheck);
webServer.start();