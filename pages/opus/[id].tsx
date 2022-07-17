import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { OpusLayout } from "@components/organisms/opus-layout";
import { useOpus } from "hooks/opus/useOpus";

const Opus: NextPage = () => {
  const router = useRouter();
  const { opusState } = useOpus();

  const { id } = router.query;
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return <div></div>;
  }

  const idx = Number(id) - 1;

  const opus = opusState.opuses[idx];
  if (!opus) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${opus.title} | ${opus.artist.name}`}</title>
        <meta name="description" content={opus.description} />
      </Head>

      <main className={styles.main}>
        <OpusLayout opus={opus} index={idx} />
      </main>
    </div>
  );
};

export default Opus;
