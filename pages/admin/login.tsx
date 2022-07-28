import Head from "next/head";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { auth } from "libs/firebase/firebase";
import { useUser } from "hooks/users/useUser";

const AdminLogin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    userState: { user },
  } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    router.replace("/admin");
  }, [user]);

  const handleSubmit = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
      toast.error(e.toString(), {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    });

    toast.success("Loggin succeeded!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>KUMD海賊版パネル展示会</title>
        <meta name="description" content="KUMD海賊版パネル展示会" />
      </Head>

      <main className={styles.main}>
        <div>
          <label htmlFor="email-input">メールアドレス</label>
          <input
            id="email-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password-input">パスワード</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            ログイン
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
