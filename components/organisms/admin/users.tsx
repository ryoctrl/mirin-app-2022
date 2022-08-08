import dayjs from "dayjs";

import { UserListRow } from "@components/molecules/admin/user/user-list-row";
import { useUser } from "hooks/users/useUser";
import { UserRegisterRow } from "@components/molecules/admin/user/user-register-row";

interface UserListProps {
  users: User[];
  updateUsers: User[];
  modifyUpdateUser: (user: User) => void;
  registerNewUser: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  updateUsers,
  modifyUpdateUser,
  registerNewUser,
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
          <UserRegisterRow registerNewUser={registerNewUser} />
          {finalyUsers.map((user) => (
            <UserListRow
              key={user.id}
              user={user}
              modifyUpdateUser={modifyUpdateUser}
              isEditable={currentUser?.uid === user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
