import "reflect-metadata";
import type { HttpMethod } from "./types";
import type Routes from "./routes";

export const HttpMethodSymbol = Symbol.for('HttpMethod');
export const RouteSymbol = Symbol.for('Route');

export const Route = (routeInfo: { path: Routes, method: HttpMethod }) => {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(RouteSymbol, routeInfo, constructor);
    return constructor;
  };
};