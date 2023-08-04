import * as admin from "firebase-admin";
const serviceAccount = require("../mirin-app-2022-firebase-adminsdk-x6nb0-c1bcbc3646.json");

admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount as Parameters<(typeof admin)["credential"]["cert"]>[0]
  ),
  databaseURL: "https://mirin-app-2022-default-rtdb.firebaseio.com",
});

/**
 * 2022 08 16. 卒業年度 (graduatedAt) を入学年度(admittedAt) に変更するための migration.
 * 実行前に以下リンクよりサービスアカウントのクレデンシャルを取得する必要があります。
 * https://console.firebase.google.com/u/0/project/mirin-app-2022/settings/serviceaccounts/adminsdk?hl=ja
 *
 * 実行方法
 * cd /path/to/functions
 * cp /path/to/<credentials.json> ./
 * pnpm ts-node migrations/20220816_change_graduatedAt_field_to_admittedAt_field.ts
 */
const artistsKey = "/app/v1/artists";
const run = async () => {
  const users = await admin.firestore().collection(artistsKey).get();
  await Promise.all(
    users.docs.map(async (doc) => {
      const { id } = doc;
      const data = doc.data();
      if (!data.graduatedAt) {
        console.log(
          `${id} skipped due to the graduatedAt field already deleted.`
        );
        return;
      }

      if (data.admittedAt) {
        console.log(
          `${id} skipped due to the admittedAt field already exists.`
        );
        return;
      }
      await admin.firestore().doc(`${artistsKey}/${doc.id}`).update({
        admittedAt: doc.data().graduatedAt,
        graduatedAt: admin.firestore.FieldValue.delete(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    })
  );
};

run();
