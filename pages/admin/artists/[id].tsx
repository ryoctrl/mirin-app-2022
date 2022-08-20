import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { AdminLayout } from "@components/templates/admin-layout";
import { useArtists } from "hooks/artists/use-artists";
import { ArtistDetail } from "@components/organisms/admin/artists-detail";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { routes } from "libs/routes";
import { useUser } from "hooks/users/useUser";

const ArtistsDetail: NextPage = () => {
  const router = useRouter();
  const { userState, isLoggedIn } = useUser();

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [userState.userInitialized, isLoggedIn, router]);

  const { artistsState } = useArtists();

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  const { id } = router.query;
  if (!id || Array.isArray(id)) {
    return <div></div>;
  }

  const artist = artistsState.artists.find((artist) => artist.id === id);
  if (!artist) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${artist.name}`}</title>
        <meta name="description" content={artist.name} />
      </Head>

      <AdminLayout>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full">
            <ArtistDetail artist={artist} />
          </div>
        </main>
      </AdminLayout>
    </div>
  );
};

export default ArtistsDetail;
