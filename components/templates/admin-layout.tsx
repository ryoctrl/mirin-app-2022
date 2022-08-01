import { ReactNode } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { LogoutIcon } from "@components/atoms/icons/logout-icon";
import { auth } from "libs/firebase/firebase";
import { Messages } from "libs/messages";
import { routes } from "libs/routes";
import { ArtistsIcon, IllustsIcon, PublicIcon } from "@components/atoms/icons";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const menuList = [
    {
      icon: (
        <IllustsIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "イラスト一覧",
      onClick: async () => {
        router.push(routes.ADMIN_ILLUSTS);
      },
    },
    {
      icon: (
        <ArtistsIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "アーティスト一覧",
      onClick: async () => {
        router.push(routes.ADMIN_ARTISTS);
      },
    },
    {
      icon: (
        <PublicIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
      text: "公開ページへ",
      onClick: async () => {
        router.push(routes.PUBLIC_TOP);
      },
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
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-500">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-500">
          <ul className="space-y-2">
            {menuList.map((menu, idx) => {
              return (
                <li className="cursor-pointer" key={idx} onClick={menu.onClick}>
                  <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    {menu.icon}
                    <span className="ml-3">{menu.text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      {children}
    </div>
  );
};
