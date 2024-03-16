export interface DataClient {
  init: () => Promise<void>;
}

export class DataClientError extends Error {
  constructor(message) {
    super(message);
  }
}
