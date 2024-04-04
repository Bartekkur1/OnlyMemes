export interface ContentUploadResult {
  externalId?: string;
  url: string;
}

export interface ContentStore {
  uploadImage: (image: Image) => Promise<ContentUploadResult>;
  deleteMeme: (id: string) => Promise<boolean>;
}

export interface Image {
  id: string;
  file: Buffer;
}