import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import type { NextPage } from "next";

import { useUser } from "hooks/users/useUser";
import { AdminLayout } from "@components/templates/admin-layout";
import { useAdmin } from "hooks/admin/useAdmin";
import { UserList } from "@components/organisms/admin/users";
import { routes } from "libs/routes";
import { SaveIcon } from "@components/atoms/icons/save-icon";
import { LoadPanel } from "@components/organisms/admin/load-panel";

const AdminUsers: NextPage = () => {
  const { isLoggedIn, userState } = useUser();
  const { adminState, modifyUser, saveModifiedUsers, registerUser } =
    useAdmin();
  const router = useRouter();

  const [updateUsers, setUpdateUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!userState.userInitialized) return;
    if (isLoggedIn()) return;
    router.replace(routes.ADMIN_LOGIN);
  }, [isLoggedIn, router, userState.userInitialized]);

  if (!userState.userInitialized || !isLoggedIn()) {
    return <LoadPanel />;
  }

  return (
    <>
      <Head>
        <title>KUMD海賊版パネル展示会 | Admin</title>
      </Head>
      <AdminLayout>
        <main className="main h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <div className="m-4 py-8 h-full bg-white flex overflow-hidden">
            <div className="mx-8 w-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h1 className="mb-8">
                  登録済みユーザー: {adminState.users.length}名
                </h1>
                {adminState.update.users.length > 0 && (
                  <button
                    disabled={adminState.update.isLoading}
                    onClick={saveModifiedUsers}
                    className="flex border border-sky-500 appearance-none rounded py-2 px-3 text-gray-700 leading-tight bg-sky-500 hover:bg-sky-700"
                  >
                    <SaveIcon className="flex-shrink-0 w-6 h-6 text-white-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="mx-2 text-white font-bold">保存</span>
                  </button>
                )}
              </div>
              <UserList
                users={adminState.users}
                updateUsers={adminState.update.users}
                modifyUpdateUser={modifyUser}
                registerNewUser={registerUser}
              />
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};

export default AdminUsers;
