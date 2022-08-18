import { createElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import type { NextPage } from "next";

import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { routes } from "libs/routes";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { StorageList } from "@components/organisms/admin/storage-list";
import { useStoredFile } from "hooks/stored-files/use-stored-file";

const AdminStorage: NextPage = () => {
  const { isLoggedIn, userState } = useUser();
  const router = useRouter();

  const { storedFileState } = useStoredFile();

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [isLoggedIn, router, userState.userInitialized]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  const download = async () => {
    const blobList = await Promise.all(
      storedFileState.storedFiles.map(async (f) => ({
        name: f.name,
        blob: await f.getBlob(),
      }))
    );

    let counter = 0;
    for (const blob of blobList) {
      const url = URL.createObjectURL(blob.blob);
      const a = document.createElement("a");
      a.download = `${blob.name}.png`;
      a.href = url;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      counter++;

      if (counter == 10) {
        counter = 0;
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  };

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Admin</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h1 className="mb-8">
                  アップロード済みファイル: {storedFileState.storedFiles.length}
                </h1>

                <button
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-sky-200"
                  type="button"
                  onClick={download}
                >
                  一括ダウンロード
                </button>
              </div>
              <StorageList works={[]} deleteWork={() => {}} />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default AdminStorage;
