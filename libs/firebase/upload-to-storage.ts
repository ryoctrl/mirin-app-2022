import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "libs/firebase/firebase";

export const uploadToStorage = async (blob: Blob): Promise<string> => {
  const uploadReference = ref(storage, `/images/${new Date().getDate()}`);
  const result = await uploadBytes(uploadReference, blob, {
    cacheControl: "max-age=0",
  });

  const url = await getDownloadURL(result.ref);
  return url;
};
