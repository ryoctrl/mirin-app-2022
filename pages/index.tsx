import Head from "next/head";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { HomeHeader } from "@components/molecules";
import { HomeLayout } from "@components/organisms";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>KUMD海賊版パネル展示会</title>
        <meta name="description" content="KUMD海賊版パネル展示会" />
      </Head>

      <main className={styles.main}>
        <HomeHeader />
        <HomeLayout />
      </main>
    </div>
  );
};

export default Home;
