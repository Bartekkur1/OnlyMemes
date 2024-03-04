import type { NextFunction, Request, RequestHandler, Response } from 'express';

export interface WebServerConfig {
  port: number;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface WebHandler {
  handler(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface RouteInformation {
  path: string;
  method: HttpMethod;
}
