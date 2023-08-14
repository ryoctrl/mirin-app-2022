import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import loadImage from "blueimp-load-image";
import { toast } from "react-toastify";
import Head from "next/head";

import type { NextPage } from "next";

import { useWorks } from "hooks/works/useWorks";
import { useArtists } from "hooks/artists/use-artists";
import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { routes } from "libs/routes";
import { Messages } from "libs/messages";
import { uploadImage } from "libs/firebase/upload-to-storage";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { ImagePicker } from "@components/molecules/image-picker";
import { initialImageInfo } from "libs/utils/image-utils";

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
  artist: Artist | null | void,
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

  const { isLoggedIn, userState } = useUser();
  const router = useRouter();

  const [illustPreview, setIllustPreview] = useState<ImageInfo>({
    ...initialImageInfo,
  });

  const [thumbPreview, setThumbPreview] = useState<ImageInfo>({
    ...initialImageInfo,
  });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [workedAt, setWorkedAt] = useState("2022");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ ...initialErrors });

  const [artistName, setArtistName] = useState("");
  const [admittedAt, setAdmittedAt] = useState(2020);
  const [twitter, setTwitter] = useState("");
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
    let createdArtist;
    if (artistId === "-1") {
      const newArtist: Artist = {
        name: artistName,
        admittedAt,
      };
      if (twitter) {
        newArtist.social = { twitter };
      }
      createdArtist = await createArtist(newArtist);
    }
    const artist =
      artistId === "-1"
        ? createdArtist
        : artistsState.artists.find((a) => a.id === artistId) ?? null;
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
      toast.error(
        Object.entries(errors)
          .map(([k, v]) => `${k}: ${v}`)
          .join(",")
      );
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
        maxHeight: 300,
        minHeight: 300,
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

  const isNotNewArtist = artistId && artistId !== "-1";
  const newArtistSet = artistId === "-1" && !!artistName;
  const isArtistSelected = isNotNewArtist || newArtistSet;

  const isRegisterActive =
    !uploading &&
    title &&
    isArtistSelected &&
    illustPreview.file &&
    thumbPreview.file;

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | New Illust</title>
      </Head>
      <AdminLayout>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8  bg-white h-full">
            <form className="px-8 h-full">
              <div className="w-full flex justify-center mb-4">
                <h1 className="text-xl">イラスト登録</h1>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full h-128">
                  <ImagePicker
                    image={illustPreview}
                    setImage={setIllustPreview}
                    chooseText="イラストを選ぶ"
                    altText={title}
                  />
                </div>
                <p className="text-xs italic">
                  ※ 長辺が最大 1920px を基準にリサイズされます。
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center w-full h-64">
                  <ImagePicker
                    image={thumbPreview}
                    setImage={setThumbPreview}
                    chooseText="サムネイル画像を選ぶ"
                    altText={title}
                  />
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
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                  />

                  <input
                    className="appearance-none border rounded  py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    id="admitted-at"
                    type="number"
                    min="2000"
                    max="2030"
                    value={admittedAt}
                    onChange={(e) => {
                      setAdmittedAt(isNaN(admittedAt) ? 2020 : admittedAt);
                    }}
                  />
                  <input
                    id="twitter-input"
                    placeholder="@twitter_id"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
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
                className="shadow appearance-none border rounded w-full bg-sky-500 hover:bg-sky-700 py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:bg-sky-200"
                disabled={!isRegisterActive}
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
