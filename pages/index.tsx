import Head from "next/head";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { HomeHeader } from "@components/molecules";
import { HomeLayout } from "@components/organisms";
import { useWorks } from "hooks/works/useWorks";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";
import OGP from "@components/organisms/ogp";

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
      <OGP
        pageTitle={`${currentExhibition?.title} ?? "KUMD海賊版パネル展示会"`}
        pagePath={`https://mirin-app-2022.mosin.jp`}
        pageDescription={currentExhibition?.title ?? "KUMD海賊版パネル展示会"}
        pageImg={currentExhibition?.heroImage?.pc}
      />

      <main className={styles.main}>
        <HomeHeader />
        <HomeLayout worksState={worksState} />
      </main>
    </div>
  );
};

export default Home;
