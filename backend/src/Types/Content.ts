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
  upVoted?: boolean;
  commentsCount: number;
}

export interface ContentSearch {
  contextUserId: number;
  pagination: Pagination;
  authorId?: number;
  role: Role;
  approved?: boolean;
  memeId?: number;
}

export interface ContentRepository {
  saveMeme(meme: Meme): AsyncResultObject<boolean>;
  deleteMeme(id: number, userId: number): Promise<boolean>;
  findMemes(query: ContentSearch): Promise<Meme[]>;
  findMeme(id: number): Promise<Meme | undefined>;
  approveMeme(id: number, approve: boolean): Promise<boolean>;
  voteMeme(memeId: number, up: boolean): Promise<boolean>;
  voteRecordExists(memeId: number, userId: number): Promise<boolean>;
  createVoteRecord(memeId: number, userId: number, up: boolean): Promise<void>;
  deleteVoteRecord(memeId: number, userId: number): Promise<void>;
}

export abstract class Transactional {
  abstract createTransaction(): Promise<string>;
  abstract commitTransaction(id: string): Promise<void>;
  abstract rollbackTransaction(id: string): Promise<void>;
}