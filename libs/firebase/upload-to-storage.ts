import loadImage from "blueimp-load-image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "libs/firebase/firebase";

export const uploadToStorage = async (
  blob: Blob,
  directory?: string
): Promise<string> => {
  const filePath = `/${directory ?? "images"}/${new Date().getTime()}`;
  const uploadReference = ref(storage, filePath);
  const result = await uploadBytes(uploadReference, blob, {
    // 1 month cache for client, 1 day cache for CDN
    cacheControl: "public, max-age=2592000, s-maxage=86400",
  });

  const url = await getDownloadURL(result.ref);
  return url;
};

type UploadImageOptions = loadImage.LoadImageOptions & {
  directory?: string;
};

export const uploadImage = async (file: File, options: UploadImageOptions) => {
  const { directory, ...loadImageOptions } = options;
  const img = await loadImage(file, loadImageOptions);

  const blob = await new Promise<Blob | null>((r) => {
    (img.image as HTMLCanvasElement).toBlob((b) => {
      r(b);
    });
  });

  if (!blob) {
    throw new Error("画像の圧縮に失敗しました。");
  }
  return await uploadToStorage(blob, directory);
};
