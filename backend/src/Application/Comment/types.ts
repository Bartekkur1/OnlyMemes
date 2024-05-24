export interface Comment {
  id: number;
  meme: number;
  author: number;
  content: string;
  publishedAt: string;
}

export interface CommentRepository {
  addComment(meme: number, author: number, content: string): Promise<boolean>;
  getComments(meme: number): Promise<Comment[]>;
}