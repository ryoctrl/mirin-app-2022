import Head from "next/head";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { HomeHeader } from "@components/molecules";
import { HomeLayout } from "@components/organisms";
import { useWorks } from "hooks/works/useWorks";
import { HeaderScrollRefs } from "libs/utils/header"

const Home: NextPage = () => {
  const { worksState } = useWorks();
  return (
    <div className={styles.container} ref={ HeaderScrollRefs.TOP }>
      <Head>
        <title>KUMD海賊版パネル展示会</title>
        <meta name="description" content="KUMD海賊版パネル展示会" />
      </Head>

      <main className={styles.main}>
        <HomeHeader />
        <HomeLayout worksState={worksState} />
      </main>
    </div>
  );
};

export default Home;
