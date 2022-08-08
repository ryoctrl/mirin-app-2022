import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import { WorksLayout } from "@components/organisms/works-layout";
import styles from "@styles/Home.module.scss";
import { useWorks } from "hooks/works/useWorks";
import OGP from "@components/organisms/ogp";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";
import { firestoreExhibitionStore } from "store/exhibitions-store";
import { firestoreWorksStore } from "store/works-store/firestore-works-store";

const Works: NextPage = () => {
  const router = useRouter();
  const { worksState } = useWorks();
  const {
    exhibitionsState: { currentExhibition },
  } = useExhibitions();

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
      <OGP
        pageTitle={`${work.title} - ${currentExhibition?.title}`}
        pagePath={`https://mirin-app-2022.mosin.jp${router.asPath}`}
        pageDescription={work.description}
        pageImg={work.image}
      />

      <main className={styles.main}>
        <WorksLayout work={work} />
      </main>
    </div>
  );
};

Works.getInitialProps = async (context) => {
  const currentExhibition =
    await firestoreExhibitionStore.findCurrentExhibition();
  const works = await firestoreWorksStore.findAll();
  return {
    worksState: {
      works,
    },
    exhibitionsState: {
      currentExhibition,
    },
  };
};
export default Works;
