import { AsyncResultObject } from "../../Util/types";

export interface ContentUploadResult {
  externalId?: string;
  url: string;
}

export interface ContentStore {
  uploadImage: (image: Image) => AsyncResultObject<ContentUploadResult>;
  deleteMeme: (id: string) => AsyncResultObject<boolean>;
}

export interface Image {
  id: string;
  file: Buffer;
}