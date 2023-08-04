import * as admin from "firebase-admin";
const serviceAccount = require("../mirin-app-2022-firebase-adminsdk-x6nb0-c1bcbc3646.json");

admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount as Parameters<(typeof admin)["credential"]["cert"]>[0]
  ),
  databaseURL: "https://mirin-app-2022-default-rtdb.firebaseio.com",
});

/**
 * 2023 08 04. 本来 works コレクション配下で管理されていた初年度の作品を初年度展示会配下の works 以下に作成しなおす.
 * 実行前に以下リンクよりサービスアカウントのクレデンシャルを取得する必要があります。
 * https://console.firebase.google.com/u/0/project/mirin-app-2022/settings/serviceaccounts/adminsdk?hl=ja
 *
 * 実行方法
 * cd /path/to/functions
 * cp /path/to/<credentials.json> ./
 * pnpm ts-node migrations/20230804_move_works_to_initial_exhibitions_works.ts
 */
const worksKey = "/app/v1/works";
const firstExhibitionsWorksKey =
  "/app/v1/exhibitions/xn993XneAqG8ojcwmldn/works";
const run = async () => {
  const works = await admin.firestore().collection(worksKey).get();
  await Promise.all(
    works.docs.map(async (doc) => {
      admin.firestore().collection(firstExhibitionsWorksKey).add(doc.data());
    })
  );
};

run();
