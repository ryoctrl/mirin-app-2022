import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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

const NewIllust: NextPage = () => {
  const { artistsState, createArtist } = useArtists();
  const { createWork } = useWorks();

  const { isLoggedIn } = useUser();
  const router = useRouter();

  const [preview, setPreview] = useState<{ file?: File; url: string }>({
    url: "",
  });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [workedAt, setWorkedAt] = useState("2022");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ ...initialErrors });

  useEffect(() => {
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div></div>;
  }

  const registerWork: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const artist = artistsState.artists.find((a) => a.id === artistId) ?? null;
    const errors = validate(title, artist, workedAt, description, preview.file);
    if (!isEmptyErrors(errors) || !artist || !preview.file) {
      setErrors(errors);
      return;
    }

    const img = await loadImage(preview.file, {
      maxWidth: 1920,
      canvas: true,
    });

    const blob = await new Promise<Blob | null>((r) => {
      (img.image as HTMLCanvasElement).toBlob((b) => {
        r(b);
      });
    });

    if (!blob) {
      toast.error("画像の圧縮に失敗しました。", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return;
    }

    const url = await uploadToStorage(blob);
    createWork({
      title,
      artist,
      workedAt: Number(workedAt),
      thumb: url,
      image: url,
      description,
      comments: [],
    });

    toast.success("", {});
  };

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    const url = files?.[0];
    if (!url) {
      return;
    }
    setPreview({
      file: files[0],
      url: window.URL.createObjectURL(url),
    });
  };

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | New Illust</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white  overflow-hidden">
            <form className="px-8">
              <div className="w-full flex justify-center mb-4">
                <h1 className="text-xl">イラスト登録</h1>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full border hover:bg-gray-100 hover:border-gray-300 relative">
                    {!preview.url && (
                      <div className="flex flex-col items-center justify-center pt-7">
                        <ImageIcon />
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Select a photo
                        </p>
                      </div>
                    )}

                    {preview.url && (
                      <Image
                        src={preview.url}
                        alt={title}
                        width="900"
                        height="900"
                      />
                    )}
                    <input
                      type="file"
                      className="opacity-0"
                      onChange={onFileChange}
                    />
                  </label>
                </div>
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
                <RegisterArtist
                  createArtist={(artist) => {
                    createArtist(artist);
                  }}
                />
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="shadow appearance-none border rounded w-full bg-sky-500 hover:bg-sky-700 py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onClick={registerWork}
              >
                登録
              </button>
            </form>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default NewIllust;
