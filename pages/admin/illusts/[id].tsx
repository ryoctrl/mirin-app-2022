import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { useWorks } from "hooks/works/useWorks";
import { AdminLayout } from "@components/templates/admin-layout";
import { WorksDetail } from "@components/organisms/admin/works-detail";
import { useUser } from "hooks/users/useUser";
import { LoadPanel } from "@components/organisms/admin/load-panel";
import { routes } from "libs/routes";

const Works: NextPage = () => {
  const router = useRouter();
  const { userState, isLoggedIn } = useUser();
  const { worksState } = useWorks();

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [userState.userInitialized, isLoggedIn, router]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  const { id } = router.query;
  if (!id || Array.isArray(id)) {
    return <div></div>;
  }

  const work = worksState.works.find((work) => work.id === id);
  if (!work) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${work.title} | ${work.artist.name}`}</title>
        <meta name="description" content={work.description} />
      </Head>

      <Head>
        <title>KUMD海賊版パネル展示会 | {work.id}</title>
      </Head>
      <AdminLayout>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full">
            <WorksDetail work={work} />
          </div>
        </main>
      </AdminLayout>
    </div>
  );
};

export default Works;
