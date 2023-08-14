import Head from "next/head";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useEffect } from "react";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { HomeHeader } from "@components/molecules";
import { HomeLayout } from "@components/organisms";
import { useWorks } from "hooks/works/useWorks";
import { HeaderScrollRefs } from "libs/utils/header";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";
import OGP from "@components/organisms/ogp";
import { firestoreExhibitionStore } from "store/exhibitions-store";
import { HomeFooter } from "@components/molecules/home/footer";
import { HomeLayout2023 } from "@components/organisms/2023/home-layout";

const Home: NextPage = () => {
  const { worksState } = useWorks();
  const router = useRouter();
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();

  useEffect(() => {
    if (!currentExhibition || currentExhibition?.inPeriod) {
      return;
    }
    if (!router.isReady) {
      return;
    }
    router.replace("/out-of-period");
  }, [currentExhibition, router]);

  if (!currentExhibition?.inPeriod) {
    return <div></div>;
  }

  return (
    <div className={styles.container} ref={HeaderScrollRefs.TOP}>
      <Head>
        <title>{currentExhibition?.title ?? "KUMD海賊版パネル展示会"}</title>
        <meta
          name="description"
          content={currentExhibition?.title ?? "KUMD海賊版パネル展示会"}
        />
      </Head>
      <OGP
        pageTitle={`${currentExhibition?.title ?? "KUMD海賊版パネル展示会"}`}
        pagePath={`https://kumd.mosin.jp${router.asPath}`}
        pageDescription={currentExhibition?.title ?? "KUMD海賊版パネル展示会"}
        pageImg={currentExhibition?.heroImage?.pc}
      />

      {/* <HomeHeader /> */}
      <HomeLayout2023
        worksState={worksState}
        inPeriod={currentExhibition?.inPeriod ?? true}
      />
      {/* <HomeFooter /> */}
    </div>
  );
};

Home.getInitialProps = async (context) => {
  const currentExhibition =
    await firestoreExhibitionStore.findCurrentExhibition();
  return {
    exhibitionsState: {
      currentExhibition,
    },
  };
};

export default Home;
