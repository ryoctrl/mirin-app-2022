import dayjs from "dayjs";

interface UserListRowProps {
  user: User;
  isEditable: boolean;
  modifyUpdateUser: (user: User) => void;
}

export const UserListRow: React.FC<UserListRowProps> = ({
  user,
  isEditable,
  modifyUpdateUser,
}) => {
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
          disabled={isEditable}
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
};
