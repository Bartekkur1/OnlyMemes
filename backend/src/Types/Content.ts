import { Pagination } from './Shared';

export interface Meme {
  id: string;
  externalId?: string;
  // base64 image
  content?: Buffer;
  // user display name
  author: number;
  authorDisplayName: string;
  publishedDate: Date;
  title: string;
  url?: string;
}

export interface ContentSearchQuery {
  author?: string;
  pagination: Pagination;
}

export interface ContentRepository {
  saveMeme(meme: Meme): Promise<void>;
  deleteMeme(id: string): Promise<void>;
  findMemes(query: ContentSearchQuery): Promise<Meme[]>;
}