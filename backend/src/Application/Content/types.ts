export interface Meme {
  id: string;
  content: string;
  // user id
  owner: string;
  publishedDate: Date;
  title: string;
  url?: string;
}