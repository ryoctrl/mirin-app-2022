import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AuthError } from "firebase/auth";

import type { NextPage } from "next";

import { auth } from "libs/firebase/firebase";
import { useUser } from "hooks/users/useUser";
import { Messages } from "libs/messages";

import "@styles/admin.module.scss";

const AdminLogin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const {
    userState: { user },
  } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    router.replace("/admin");
  }, [user]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((e: AuthError) => {
      const msg = Messages.FIREBASE[e.code as keyof typeof Messages.FIREBASE];

      toast.error(msg || e.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    });

    if (!result) {
      return;
    }

    toast.success(Messages.SYSTEM.LOGIN_SUCCEEDED, {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });
  };

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Login</title>
      </Head>
      <main className="h-screen w-screen flex justify-center items-center bg-gray-100">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="example@mosin.jp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              パスワード
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              ログイン
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </main>
    </>
  );
};

export default AdminLogin;
