export interface ImageUploadPayload {
  title: string;
  image: File;
}

export interface Meme {
  id: number;
  url: string;
  author: string;
  authorId: number;
  publishedDate: string;
  title: string;
  approved: boolean;
  votes: number;
}

export interface FetchMemesQuery {
  page: number;
  size: number;
  author?: number;
  approved?: boolean;
}