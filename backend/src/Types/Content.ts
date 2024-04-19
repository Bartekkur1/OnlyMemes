import { AsyncResultObject } from '../Util/types';
import { Role } from './Identity';
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
  approved: boolean;
}

export interface ContentSearch {
  pagination: Pagination;
  authorId?: number;
  role: Role;
  approved?: boolean;
}

export interface ContentRepository {
  saveMeme(meme: Meme): AsyncResultObject<boolean>;
  deleteMeme(id: string, userId: number): Promise<boolean>;
  findMemes(query: ContentSearch): Promise<Meme[]>;
  findMeme(id: string): Promise<Meme | undefined>;
  approveMeme(id: string, approve: boolean): Promise<boolean>;
}

export abstract class Transactional {
  abstract createTransaction(): Promise<string>;
  abstract commitTransaction(id: string): Promise<void>;
  abstract rollbackTransaction(id: string): Promise<void>;
}