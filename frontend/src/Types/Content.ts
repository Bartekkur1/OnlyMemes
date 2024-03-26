export interface ImageUploadPayload {
  title: string;
  image: string;
}

export interface Meme {
  id: number;
  url: string;
  author: string;
  authorId: number;
  publishedDate: string;
  title: string;
}
