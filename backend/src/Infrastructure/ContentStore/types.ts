export interface ContentStore {
  // Returns URL to meme
  uploadImage: (image: Image) => Promise<string>;
  // deleteMeme: () => Promise<void>;
}

export interface Image {
  id: string;
  content: string;
}