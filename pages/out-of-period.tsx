import Head from "next/head";
import { useRouter } from "next/router";
import dayjs from "dayjs";

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
import { OutOfPeriodLayout } from "@components/organisms/out-of-period-layout";

const OutOfPeriod: NextPage = () => {
  const { worksState } = useWorks();
  const router = useRouter();
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();

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
        pagePath={`https://mirin-app-2022.mosin.jp${router.asPath}`}
        pageDescription={currentExhibition?.title ?? "KUMD海賊版パネル展示会"}
        pageImg={currentExhibition?.heroImage?.pc}
      />

      <main className={styles.main}>
        <OutOfPeriodLayout />
      </main>
    </div>
  );
};

OutOfPeriod.getInitialProps = async (context) => {
  const currentExhibition =
    await firestoreExhibitionStore.findCurrentExhibition();
  return {
    exhibitionsState: {
      currentExhibition,
    },
  };
};

export default OutOfPeriod;
