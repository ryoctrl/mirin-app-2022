import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { useWorks } from "hooks/works/useWorks";
import { AdminLayout } from "@components/templates/admin-layout";
import { WorksDetail } from "@components/organisms/admin/works-detail";

const Works: NextPage = () => {
  const router = useRouter();
  const { worksState } = useWorks();

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
