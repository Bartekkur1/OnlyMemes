export interface Logger {
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
}

export interface ResultObject<T> {
  data?: T;
  status: 'success' | 'error';
  error?: string;
}

export type AsyncResultObject<T = undefined> = Promise<ResultObject<T>>;