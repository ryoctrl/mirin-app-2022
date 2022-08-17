import { ReactNode } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

import { LogoutIcon } from "@components/atoms/icons/logout-icon";
import { auth } from "libs/firebase/firebase";
import { Messages } from "libs/messages";
import { routes } from "libs/routes";
import { ArtistsIcon, IllustsIcon, PublicIcon } from "@components/atoms/icons";
import { useUser } from "hooks/users/useUser";
import { UsersIcon } from "@components/atoms/icons/users-icon";
import { SettingsIcon } from "@components/atoms/icons/settings-icon";
import { WrapLink } from "@components/atoms/wrap-link";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { userState } = useUser();
  const menuList = [
    {
      icon: (
        <IllustsIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "イラスト一覧",
      path: routes.ADMIN_ILLUSTS,
    },
    {
      icon: (
        <ArtistsIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "アーティスト一覧",
      path: routes.ADMIN_ARTISTS,
    },
    {
      icon: (
        <UsersIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "ユーザー一覧",
      path: routes.ADMIN_USERS,
      isAdminOnly: true,
    },
    {
      icon: (
        <SettingsIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "展示会設定",
      path: routes.ADMIN_EXHIBITION_SETTINGS,
      isAdminOnly: true,
    },
    {
      icon: (
        <PublicIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "公開ページへ",
      path: routes.PUBLIC_TOP,
      outerLink: true,
    },
    {
      icon: (
        <LogoutIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "ログアウト",
      onClick: async () => {
        await auth.signOut();
        toast.success(Messages.SYSTEM.LOGOUT_SUCCEEDED, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      },
    },
  ];

  return (
    <div className="flex  flex-row min-h-screen bg-gray-100 text-gray-800">
      <aside className="invisible lg:visible sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-500">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-500">
          <ul className="space-y-2">
            {menuList
              .filter((m) => !m.isAdminOnly || userState.userInfo?.roles.admin)
              .map((menu, idx) => {
                const isSelected = router.pathname === menu.path;
                return (
                  <WrapLink
                    path={menu.path}
                    outerLink={menu.outerLink}
                    key={idx}
                  >
                    <li className="cursor-pointer" onClick={menu.onClick}>
                      <div
                        className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isSelected ? "bg-gray-100 dark:bg-gray-600" : ""
                        }`}
                      >
                        {menu.icon}
                        <span className="ml-3">{menu.text}</span>
                      </div>
                    </li>
                  </WrapLink>
                );
              })}
          </ul>
        </div>
      </aside>
      {children}
    </div>
  );
};
