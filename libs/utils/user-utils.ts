export const compareUser = (a: User, b: User): boolean => {
  return a.id === b.id && a.email === b.email && a.admin === b.admin;
};

/**
 * 更新対象のユーザの内容をもとに、更新リストに入っているユーザリストを生成する
 * 変更内容が baseUsers に指定したユーザの内容と同一な場合、更新リストから対象のユーザを抜く
 * @param modifiedUser 更新対象のユーザ
 * @param currentModifiedUsers 更新リストに入っているユーザリスト
 * @param baseUsers 元々のユーザリスト
 * @returns
 */
export const generateModifiedUserList = (
  modifiedUser: User,
  currentModifiedUsers: User[],
  baseUsers: User[]
): User[] => {
  const userIndex = currentModifiedUsers.findIndex(
    (u) => u.id === modifiedUser.id
  );
  const baseUser = baseUsers.find((u) => u.id === modifiedUser.id);
  if (!baseUser) {
    return currentModifiedUsers;
  }

  if (compareUser(modifiedUser, baseUser)) {
    return currentModifiedUsers.filter((u) => u.id !== modifiedUser.id);
  }

  let newModifiedUsers = [...currentModifiedUsers];
  if (userIndex !== -1) {
    newModifiedUsers[userIndex] = modifiedUser;
  } else {
    newModifiedUsers.push(modifiedUser);
  }
  return newModifiedUsers;
};
