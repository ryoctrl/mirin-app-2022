import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";

import type { NextPage } from "next";

import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { routes } from "libs/routes";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { ImagePicker } from "@components/molecules/image-picker";
import { initialImageInfo } from "libs/utils/image-utils";
import { uploadImage } from "libs/firebase/upload-to-storage";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";
import { SaveIcon } from "@components/atoms/icons/save-icon";
import { DateRangePicker } from "@components/molecules/date-range-picker";

const ExhibitionSettings: NextPage = () => {
  const { isLoggedIn, userState } = useUser();
  const router = useRouter();
  const {
    exhibitionsState: { currentExhibition },
    updateExhibition,
  } = useExhibitions();

  const [pcHeroImage, setPcHeroImage] = useState<ImageInfo>({
    ...initialImageInfo,
  });

  const [spHeroImage, setSpHeroImage] = useState<ImageInfo>({
    ...initialImageInfo,
  });

  const [exhibitionTitle, setExhibitionTitle] = useState("");
  const [startAt, setStartAt] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  });

  const [endAt, setEndAt] = useState(() => {
    const date = new Date();
    date.setMonth(startAt.getMonth() + 1);
    return date;
  });

  useEffect(() => {
    if (!currentExhibition) return;
    setPcHeroImage({
      ...pcHeroImage,
      url: currentExhibition.heroImage.pc,
    });
    setSpHeroImage({
      ...spHeroImage,
      url: currentExhibition.heroImage.sp,
    });
    setExhibitionTitle(currentExhibition.title);
    if (currentExhibition.startAt) {
      setStartAt(currentExhibition.startAt);
    }
    if (currentExhibition.endAt) {
      setEndAt(currentExhibition.endAt);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExhibition]);

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [isLoggedIn, router, userState.userInitialized]);

  useEffect(() => {
    if (startAt.getTime() > endAt.getTime()) setStartAt(endAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endAt]);

  useEffect(() => {
    if (startAt.getTime() > endAt.getTime()) setEndAt(startAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAt]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  const saveExhibitionSettings = async () => {
    if (!currentExhibition) return;

    const [pcUrl, spUrl] = await Promise.all([
      pcHeroImage.file
        ? uploadImage(pcHeroImage.file, {
            maxWidth: 1920,
            canvas: true,
          }).catch(() => {
            toast.error("PC向けヒーローイメージの圧縮に失敗しました。");
            return null;
          })
        : null,
      spHeroImage.file
        ? uploadImage(spHeroImage.file, {
            maxWidth: 1284,
            canvas: true,
          }).catch(() => {
            toast.error(
              "スマートフォン向けヒーローイメージの圧縮に失敗しました。"
            );
            return null;
          })
        : null,
    ]);

    updateExhibition({
      ...currentExhibition,
      title: exhibitionTitle,
      startAt,
      endAt,
      heroImage: {
        pc: pcUrl ?? currentExhibition.heroImage.pc,
        sp: spUrl ?? currentExhibition.heroImage.sp,
      },
    });
  };

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Admin</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h1>展示会設定 (開催中: {currentExhibition?.title})</h1>
                <button
                  onClick={saveExhibitionSettings}
                  className="flex border border-sky-500 appearance-none rounded py-2 px-3 text-gray-700 leading-tight bg-sky-500 hover:bg-sky-700"
                >
                  <SaveIcon className="flex-shrink-0 w-6 h-6 text-white-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="mx-2 text-white font-bold">保存</span>
                </button>
              </div>
              <div>
                <label>展示会タイトル変更</label>
                <input
                  id="title-input"
                  placeholder="展示会タイトル"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={exhibitionTitle}
                  onChange={(e) => setExhibitionTitle(e.target.value)}
                />
              </div>
              <div>
                <label>展示会開催期間</label>
                <DateRangePicker
                  startDate={startAt}
                  setStartDate={setStartAt}
                  endDate={endAt}
                  setEndDate={setEndAt}
                />
              </div>
              <div className="mb-4 flex h-64">
                <div className="flex-1 pr-4">
                  <div className="my-2">PC 向けヒーローイメージ設定</div>
                  <ImagePicker
                    image={pcHeroImage}
                    setImage={setPcHeroImage}
                    chooseText="PC向けヒーローイメージを選ぶ"
                    altText="ヒーローイメージ"
                  />
                  <p className="text-xs italic">
                    ※ 長辺が最大 1920px を基準にリサイズされます。
                  </p>
                </div>
                <div className="flex-1 pl-4">
                  <div className="my-2">
                    スマートフォン向けヒーローイメージ設定
                  </div>
                  <ImagePicker
                    image={spHeroImage}
                    setImage={setSpHeroImage}
                    chooseText="スマートフォン向けヒーローイメージを選ぶ"
                    altText="スマートフォン向けヒーローイメージ"
                  />
                  <p className="text-xs italic">
                    ※ 長辺が最大 1284px を基準にリサイズされます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default ExhibitionSettings;
