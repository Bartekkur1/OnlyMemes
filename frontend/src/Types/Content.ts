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
  upVoted?: boolean;
}

export interface Comment {
  id: number;
  author: number;
  content: string;
  display_name: string;
  published_at: string;
}

export interface FetchMemesQuery {
  page: number;
  size: number;
  author?: number;
  approved?: boolean;
  memeId?: number;
}