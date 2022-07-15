import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { opuses } from "@constants/sample-opus";
import { OpusLayout } from "@components/organisms/opus-layout";

const Opus: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id || Array.isArray(id)) {
    return <div></div>;
  }

  const opus = opuses.find((opus) => opus.id === Number(id));
  if (!opus) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${opus.title} | ${opus.artist}`}</title>
        <meta name="description" content={opus.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <OpusLayout opus={opus} />
      </main>
    </div>
  );
};

export default Opus;
