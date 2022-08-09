import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as SendGrid from "@sendgrid/mail";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const mailTemplate = `
<h1>KUMD管理者ページへの招待</h1>

<a href="{{LINK}}">このリンク</a> をクリックしてパスワードの設定を完了し、ログインしてください。

以後は <a href="{{ADMIN_LINK}}">管理者ページ</a> よりログインしてください。
`;

export const registerNewUser = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "To reigster new user you must have admin permission."
    );
  }

  const newUser = await admin
    .auth()
    .createUser({
      email: data.email,
    })
    .catch((err) => {
      return err;
    });

  if (newUser instanceof Error) {
    throw new functions.https.HttpsError("internal", newUser.message);
  }

  const adminUrl = process.env.SITE_URL.endsWith("/")
    ? `${process.env.SITE_URL}admin`
    : `${process.env.SITE_URL}/admin`;

  const url = await admin
    .auth()
    .generatePasswordResetLink(data.email, {
      url: adminUrl,
    })
    .catch((err) => err);
  if (url instanceof Error) {
    throw new functions.https.HttpsError("internal", newUser.message);
  }

  const message = {
    to: data.email,
    from: "noreply@kumd.mosin.jp",
    subject: "KUMD管理者ページへの招待",
    html: mailTemplate
      .replace(/{{LINK}}/g, url)
      .replace(/{{ADMIN_LINK}}/g, adminUrl),
  };

  const result = await SendGrid.send(message).catch((err) => err);
  if (result instanceof Error) {
    throw new functions.https.HttpsError("internal", newUser.message);
  }

  return {
    user: {
      email: newUser.email,
    },
    message: "registered new user",
  };
});
