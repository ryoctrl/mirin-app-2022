import NextImage from "next/image";
import { ChangeEvent, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { ImageIcon } from "@components/atoms/icons/image-icon";

type ImagePickerProps = {
  image: ImageInfo;
  setImage: (image: ImageInfo) => void;
  chooseText?: string;
  altText?: string;
};

export const ImagePicker: React.FC<ImagePickerProps> = ({
  image,
  setImage,
  chooseText,
  altText,
}) => {
  const chooseFiles = useCallback(
    (files: File[] | FileList) => {
      const file = files[0];
      if (!file) {
        return;
      }

      const img = new Image();
      const url = window.URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          file,
          url,
          width: img.width,
          height: img.height,
        });
      };

      img.src = url;
    },
    [setImage]
  );

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    chooseFiles(files ?? []);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: chooseFiles,
  });

  return (
    <label
      className="flex flex-col justify-center w-full h-full border hover:bg-gray-100 hover:border-gray-300 relative"
      {...getRootProps()}
    >
      {!image.url && (
        <div className="flex flex-col items-center justify-center">
          <ImageIcon />
          {chooseText && (
            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
              {chooseText}
            </p>
          )}
          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
            ここをクリックするか、画像をドラッグ&ドロップで選択できます。
          </p>
        </div>
      )}

      {image.url && (
        <NextImage
          alt={altText ?? "画像"}
          src={image.url}
          layout="fill"
          objectFit="contain"
        />
      )}
      <input
        type="file"
        accept="image/*"
        className="opacity-0 h-0"
        onChange={onFileChange}
        {...getInputProps()}
      />
    </label>
  );
};
