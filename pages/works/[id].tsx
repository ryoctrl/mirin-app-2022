import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import { WorksLayout } from "@components/organisms/works-layout";
import styles from "@styles/Home.module.scss";
import { useWorks } from "hooks/works/useWorks";

const Works: NextPage = () => {
  const router = useRouter();
  const { worksState } = useWorks();

  const { id } = router.query;
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return <div></div>;
  }

  const idx = Number(id) - 1;

  const work = worksState.works[idx];
  if (!work) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${work.title} | ${work.artist.name}`}</title>
        <meta name="description" content={work.description} />
      </Head>

      <main className={styles.main}>
        <WorksLayout work={work} index={idx} />
      </main>
    </div>
  );
};

export default Works;
