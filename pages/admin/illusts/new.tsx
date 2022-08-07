import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import loadImage from "blueimp-load-image";
import { toast } from "react-toastify";
import Head from "next/head";

import type { NextPage } from "next";

import { useWorks } from "hooks/works/useWorks";
import { useArtists } from "hooks/artists/use-artists";
import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { routes } from "libs/routes";
import { ImageIcon } from "@components/atoms/icons/image-icon";
import { RegisterArtist } from "@components/organisms/admin/register-artist";
import { Messages } from "libs/messages";
import { uploadToStorage } from "libs/firebase/upload-to-storage";
import { LoadPanel } from "@components/organisms/admin/load-panel";

type FormErrors = {
  title: string;
  artist: string;
  workedAt: string;
  description: string;
  file: string;
};

const initialErrors: FormErrors = {
  title: "",
  artist: "",
  workedAt: "",
  description: "",
  file: "",
} as const;

const validate = (
  title: string,
  artist: Artist | null,
  workedAt: string,
  description: string,
  file?: File
): FormErrors => {
  const errors = { ...initialErrors };
  if (!title) {
    errors.title = Messages.SYSTEM.INVALID_TITLE;
  }

  if (!artist) {
    errors.artist = Messages.SYSTEM.INVALID_ARTIST;
  }

  if (!workedAt || isNaN(Number(workedAt))) {
    errors.workedAt = Messages.SYSTEM.INVALID_WORKED_AT;
  }

  if (!file) {
    errors.file = Messages.SYSTEM.INVALID_FILE;
  }

  return errors;
};

const isEmptyErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).every((e) => !e);
};

type ImageInfo = {
  file?: File;
  url: string;
  height: number;
  width: number;
};

const uploadImage = async (file: File, options: loadImage.LoadImageOptions) => {
  const img = await loadImage(file, options);

  const blob = await new Promise<Blob | null>((r) => {
    (img.image as HTMLCanvasElement).toBlob((b) => {
      r(b);
    });
  });

  if (!blob) {
    throw new Error("画像の圧縮に失敗しました。");
  }
  return await uploadToStorage(blob);
};

const calcPreviewSize = (
  image: ImageInfo
): { width: number; height: number } => {
  const useHeight = image.height > image.width;
  console.log(image);

  let height = image.height;
  let width = image.width;

  if (useHeight) {
    height = image.height > 600 ? 600 : image.height;
    if (height === 600) {
      width *= 600 / image.height;
    }
  } else {
    width = image.width > 600 ? 600 : image.width;
    if (width === 600) {
      height *= 600 / image.width;
    }
  }
  return {
    height,
    width,
  };
};

const NewIllust: NextPage = () => {
  const { artistsState, createArtist } = useArtists();
  const { createWork } = useWorks();

  const { isLoggedIn, userState } = useUser();
  const router = useRouter();

  const [illustPreview, setIllustPreview] = useState<ImageInfo>({
    url: "",
    height: -1,
    width: -1,
  });

  const [thumbPreview, setThumbPreview] = useState<ImageInfo>({
    url: "",
    height: -1,
    width: -1,
  });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [workedAt, setWorkedAt] = useState("2022");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ ...initialErrors });

  const [artistName, setArtistName] = useState("");
  const [isGraduated, setIsGraduated] = useState(false);
  const [graduate, setGraduate] = useState(2020);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [userState.userInitialized, isLoggedIn, router]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  const registerWork: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setUploading(true);
    const artist = artistsState.artists.find((a) => a.id === artistId) ?? null;
    const errors = validate(
      title,
      artist,
      workedAt,
      description,
      illustPreview.file
    );
    if (
      !isEmptyErrors(errors) ||
      !artist ||
      !illustPreview.file ||
      !thumbPreview.file
    ) {
      setErrors(errors);
      return;
    }

    const [illustUrl, thumbUrl] = await Promise.all([
      uploadImage(illustPreview.file, {
        maxWidth: 1920,
        canvas: true,
      }).catch(() => {
        toast.error("イラスト画像の圧縮に失敗しました。", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        return null;
      }),
      uploadImage(thumbPreview.file, {
        maxWidth: 480,
        minWidth: 480,
        maxHeight: 480,
        minHeight: 480,
        canvas: true,
      }).catch(() => {
        toast.error("サムネイル画像の圧縮に失敗しました。", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        return null;
      }),
    ]);

    if (!illustUrl || !thumbUrl) {
      return;
    }

    setUploading(false);

    createWork(
      {
        title,
        artist,
        workedAt: Number(workedAt),
        thumb: thumbUrl,
        image: illustUrl,
        description,
        comments: [],
      },
      {
        path: routes.ADMIN_ILLUSTS,
      }
    );
  };

  const onFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setImage: (image: ImageInfo) => void
  ) => {
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

  const illustPreviewSize = calcPreviewSize(illustPreview);
  const thumbPreviewSize = calcPreviewSize(thumbPreview);

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | New Illust</title>
      </Head>
      <AdminLayout>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8  bg-white  ">
            <form className="px-8">
              <div className="w-full flex justify-center mb-4">
                <h1 className="text-xl">イラスト登録</h1>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center w-full border hover:bg-gray-100 hover:border-gray-300 relative">
                    {!illustPreview.url && (
                      <div className="flex flex-col items-center justify-center pt-7">
                        <ImageIcon />
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          イラストを選ぶ
                        </p>
                      </div>
                    )}

                    {illustPreview.url && (
                      <NextImage
                        src={illustPreview.url}
                        alt={title}
                        width={illustPreviewSize.width.toString()}
                        height={illustPreviewSize.height.toString()}
                        layout="fixed"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="opacity-0 h-0"
                      onChange={(e) => onFileChange(e, setIllustPreview)}
                    />
                  </label>
                </div>
                <p className="text-xs italic">
                  ※ 長辺が最大 1920px を基準にリサイズされます。
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center w-full border hover:bg-gray-100 hover:border-gray-300 relative">
                    {!thumbPreview.url && (
                      <div className="flex flex-col items-center justify-center pt-7">
                        <ImageIcon />
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          サムネイル画像を選ぶ
                        </p>
                      </div>
                    )}

                    {thumbPreview.url && (
                      <NextImage
                        src={thumbPreview.url}
                        alt={title}
                        layout="fixed"
                        width={thumbPreviewSize.width}
                        height={thumbPreviewSize.height}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="opacity-0 h-0"
                      onChange={(e) => onFileChange(e, setThumbPreview)}
                    />
                  </label>
                </div>
                <p className="text-xs italic">
                  ※ サムネイル画像は 480px 四方の正方形にリサイズされます。
                </p>
              </div>

              <input
                id="title-input"
                placeholder="作品タイトル"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="artist-input"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
              >
                <option>アーティスト/作者を選択</option>
                <option value="-1">作者を追加する</option>
                {artistsState.artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              {artistId === "-1" && (
                <>
                  <input
                    id="title-input"
                    placeholder="作者名"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="my-2">
                    <label className="text-gray-700 text-sm font-bold mb-2 py-2">
                      卒業済み?
                    </label>
                    <input
                      type="checkbox"
                      className=" border rounded py-2 mx-3"
                      checked={isGraduated}
                      onChange={(e) => setIsGraduated(e.target.checked)}
                    />
                    {isGraduated && (
                      <input
                        className="appearance-none border rounded  py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id="graduate"
                        type="number"
                        min="2000"
                        max="2030"
                        disabled={!isGraduated}
                        value={graduate}
                        onChange={(e) => {
                          const graduate = Number(e.target.value);
                          setGraduate(isNaN(graduate) ? 2020 : graduate);
                        }}
                      />
                    )}
                  </div>
                </>
              )}
              <input
                id="worked-input"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="制作年"
                type="number"
                min="2000"
                max="2030"
                step="1"
                value={workedAt}
                onChange={(e) => setWorkedAt(e.target.value)}
              />

              <textarea
                id="description-input"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="作品詳細"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="shadow appearance-none border rounded w-full bg-sky-500 hover:bg-sky-700 py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                disabled={uploading}
                onClick={registerWork}
              >
                {uploading ? "アップロード中..." : "登録"}
              </button>
            </form>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default NewIllust;
