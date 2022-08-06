import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import type { NextPage } from "next";

import { useWorks } from "hooks/works/useWorks";
import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { WorksList } from "@components/organisms/admin/works";
import { routes } from "libs/routes";
import { AddIcon } from "@components/atoms/icons/add-icon";

const Admin: NextPage = () => {
  const { worksState } = useWorks();

  const { isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Admin</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow ml-0 -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h1>登録済みイラスト: {worksState.works.length} 枚</h1>
                <Link href={routes.ADMIN_NEW_ILLUST}>
                  <button className="flex border border-sky-500 appearance-none rounded py-2 px-3 text-gray-700 leading-tight bg-sky-500 hover:bg-sky-700">
                    <AddIcon className="flex-shrink-0 w-6 h-6 text-white-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="mx-2 text-white font-bold">
                      イラストを追加する
                    </span>
                  </button>
                </Link>
              </div>
              <WorksList works={worksState.works} />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default Admin;
