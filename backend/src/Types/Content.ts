import { AsyncResultObject } from '../Util/types';
import { Pagination } from './Shared';

export interface Meme {
  id: string;
  // content storage id
  externalId?: string;
  // base64 image
  content?: Buffer;
  // user display name
  author: string;
  // user id
  authorId: number;
  publishedDate: Date;
  title: string;
  url?: string;
}

export interface ContentSearchQuery {
  authorId?: number;
  pagination: Pagination;
}

export interface ContentRepository {
  saveMeme(meme: Meme): AsyncResultObject<boolean>;
  deleteMeme(id: string, userId: number): Promise<boolean>;
  findMemes(query: ContentSearchQuery): Promise<Meme[]>;
  findMeme(id: string): Promise<Meme | undefined>;
}

export abstract class Transactional {
  abstract createTransaction(): Promise<string>;
  abstract commitTransaction(id: string): Promise<void>;
  abstract rollbackTransaction(id: string): Promise<void>;
}