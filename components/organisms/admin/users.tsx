import dayjs from "dayjs";

import { useUser } from "hooks/users/useUser";

interface UserListProps {
  users: User[];
  updateUsers: User[];
  modifyUpdateUser: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  updateUsers,
  modifyUpdateUser,
}) => {
  const {
    userState: { user: currentUser },
  } = useUser();

  const finalyUsers = users.map((user) => {
    const updateUser = updateUsers.find((u) => u.id === user.id);
    return updateUser ? updateUser : user;
  });

  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              メールアドレス
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              管理者
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              登録日時
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              更新日時
            </th>
          </tr>
        </thead>
        <tbody>
          {finalyUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  {user.email}
                </td>
                <td
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  <input
                    type="checkbox"
                    checked={user.admin}
                    disabled={currentUser?.uid === user.id}
                    onChange={(e) =>
                      modifyUpdateUser({
                        ...user,
                        admin: e.target.checked,
                      })
                    }
                  />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(user.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
