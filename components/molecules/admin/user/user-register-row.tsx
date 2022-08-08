import { useState } from "react";
import { toast } from "react-toastify";

interface UserRegisterRowProps {
  registerNewUser: (user: User) => void;
}

export const UserRegisterRow: React.FC<UserRegisterRowProps> = ({
  registerNewUser,
}) => {
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  const onClickRegister = () => {
    if (!email) {
      toast.error("メールアドレスは必ず入力してください");
      return;
    }
    registerNewUser({
      email,
      admin,
    });
  };
  return (
    <tr>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="kumd@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </td>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        <input
          type="checkbox"
          checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
        />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          disabled={!email}
          onClick={onClickRegister}
        >
          新しいユーザを登録
        </button>
      </td>
    </tr>
  );
};
