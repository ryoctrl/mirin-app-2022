import dayjs from "dayjs";

import { DeleteIcon } from "@components/atoms/icons/delete-icon";

interface CommentListRowProps {
  comment: WorksComment;
  beginDeleteAction: (comment: WorksComment) => void;
}

export const CommentListRow: React.FC<CommentListRowProps> = ({
  comment,
  beginDeleteAction,
}) => {
  return (
    <tr key={comment.id}>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
      >
        <button
          onClick={() => beginDeleteAction(comment)}
          type="button"
          data-modal-toggle="test-modal"
        >
          <DeleteIcon className="rotate-45 flex-shrink-0 w-6 h-6 text-red-500 transition duration-75 dark:text-red group-hover:text-gray-900 dark:group-hover:text-white" />
        </button>
      </td>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        {comment.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {comment.text}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </td>
    </tr>
  );
};
