import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import type { NextPage } from "next";

import { useArtists } from "hooks/artists/use-artists";
import { useUser } from "hooks/users/useUser";
import { ArtistList } from "@components/organisms/admin/artists";
import { AdminLayout } from "@components/templates/admin-layout";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { routes } from "libs/routes";

const Admin: NextPage = () => {
  const { artistsState, deleteArtist, createArtist } = useArtists();

  const { isLoggedIn, userState } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [userState.userInitialized, isLoggedIn, router]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Admin</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full h-full flex flex-col">
              <h1 className="mb-8">
                登録済みメンバー: {artistsState.artists.length}名
              </h1>
              <ArtistList
                artists={artistsState.artists}
                deleteArtist={deleteArtist}
                createArtist={createArtist}
              />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default Admin;
