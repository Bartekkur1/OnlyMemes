import { Pagination } from './Shared';

export interface Meme {
  id: string;
  // base64 image
  content: string;
  // user id
  author: number;
  publishedDate: Date;
  title: string;
  url?: string;
}

export interface ContentRepository {
  saveMeme(meme: Meme): Promise<void>;
  deleteMeme(id: string): Promise<void>;
  findMemes(pagination: Pagination): Promise<Meme[]>;
}