import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "libs/firebase/firebase";

export const uploadToStorage = async (blob: Blob): Promise<string> => {
  const uploadReference = ref(storage, `/images/${new Date().getTime()}`);
  const result = await uploadBytes(uploadReference, blob, {
    // 1 month cache for client, 1 day cache for CDN
    cacheControl: "public, max-age=2592000, s-maxage=86400",
  });

  const url = await getDownloadURL(result.ref);
  return url;
};
