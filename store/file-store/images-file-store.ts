import {
  deleteObject,
  getBlob,
  getDownloadURL,
  listAll,
  ref,
} from "firebase/storage";

import { FileStore } from "./file-store.interface";

import { storage } from "libs/firebase/firebase";

export class ImagesFileStore implements FileStore {
  private path = "/images";
  private dirRef;

  constructor() {
    this.dirRef = ref(storage, this.path);
  }

  async findAll(): Promise<StoredFile[]> {
    const list = await listAll(this.dirRef);
    const files = await Promise.all(
      list.items.map<Promise<StoredFile>>(async (item) => {
        return {
          name: item.name,
          url: await getDownloadURL(item),
          path: item.fullPath,
          getBlob: async () => {
            return await getBlob(item);
          },
        };
      })
    );
    return files;
  }

  async delete(storedFile: StoredFile) {
    await deleteObject(ref(storage, storedFile.path));
    return true;
  }
}
