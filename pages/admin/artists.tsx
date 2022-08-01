import { useEffect } from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import { useArtists } from "hooks/artists/use-artists";
import { useUser } from "hooks/users/useUser";
import { ArtistList } from "@components/organisms/admin/artists";
import { AdminLayout } from "@components/templates/admin-layout";

const Admin: NextPage = () => {
  const { artistsState, deleteArtist } = useArtists();

  const { isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) return;
    router.replace("/admin/login");
  }, [isLoggedIn]);

  return (
    <>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full overflow-hidden">
              <h1 className="mb-8">
                登録済みメンバー: {artistsState.artists.length}名
              </h1>
              <ArtistList
                artists={artistsState.artists}
                deleteArtist={deleteArtist}
              />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default Admin;
