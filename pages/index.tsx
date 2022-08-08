import Head from "next/head";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { HomeHeader } from "@components/molecules";
import { HomeLayout } from "@components/organisms";
import { useWorks } from "hooks/works/useWorks";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

const Home: NextPage = () => {
  const { worksState } = useWorks();
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();
  return (
    <div className={styles.container}>
      <Head>
        <title>{currentExhibition?.title ?? "KUMD海賊版パネル展示会"}</title>
        <meta
          name="description"
          content={currentExhibition?.title ?? "KUMD海賊版パネル展示会"}
        />
      </Head>

      <main className={styles.main}>
        <HomeHeader />
        <HomeLayout worksState={worksState} />
      </main>
    </div>
  );
};

export default Home;
