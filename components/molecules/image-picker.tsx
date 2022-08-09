import NextImage from "next/image";
import { ChangeEvent } from "react";

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
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];
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
  };

  return (
    <label className="flex flex-col justify-center w-full h-full border hover:bg-gray-100 hover:border-gray-300 relative">
      {!image.url && (
        <div className="flex flex-col items-center justify-center">
          <ImageIcon />
          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
            {chooseText ?? "画像を選ぶ"}
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
        // onChange={(e) => onFileChange(e, setIllustPreview)}
      />
    </label>
  );
};
