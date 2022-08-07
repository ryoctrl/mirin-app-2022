import Image from "next/image";
import { useState } from "react";

import { CommentListRow } from "@components/molecules/admin/comment/comment-list-row";
import { Modal } from "@components/atoms/modal/modal";
import { useWorks } from "hooks/works/useWorks";

interface WorksDetailProps {
  work: Work;
}

export const WorksDetail: React.FC<WorksDetailProps> = ({ work }) => {
  const { deleteComment } = useWorks();
  const [deleteTargetComment, setDeleteComment] = useState<WorksComment | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex h-full">
      <Modal id="test-modal" title="Confirm" isOpen={modalOpen}>
        <div className="p-6 space-y-6 text-white">
          コメント ID:{deleteTargetComment?.id} を削除しますか?
        </div>
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => {
              if (!deleteTargetComment?.id || !work.id) {
                setModalOpen(false);
                return;
              }
              deleteComment(work.id, deleteTargetComment);
              setModalOpen(false);
            }}
          >
            削除する
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={() => setModalOpen(false)}
          >
            やめる
          </button>
        </div>
      </Modal>
      <div className="flex-1">
        <div className="flex h-1/2">
          <div className="relative w-full h-full flex justify-center">
            <div>イラスト</div>
            <Image
              alt={`${work.title} - イラスト`}
              src={work.image}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-full h-full flex justify-center">
            <div>サムネイル</div>
            <Image
              alt={`${work.title} - サムネイル`}
              src={work.thumb}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <table className="w-full space-y-4">
          <tbody className="border">
            <tr>
              <td colSpan={1} className="text-center border">
                タイトル
              </td>
              <td colSpan={2} className="text-center border">
                {work.title}
              </td>
            </tr>
            <tr>
              <td colSpan={1} className="text-center border">
                アーティスト
              </td>
              <td colSpan={2} className="text-center border">
                {work.artist.name}
              </td>
            </tr>
            <tr>
              <td colSpan={1} className="text-center border">
                制作年
              </td>
              <td colSpan={2} className="text-center border">
                {work.workedAt}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex-1 bg-white mx-4 radius">
        {work.comments.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            コメントはありません
          </div>
        )}
        {work.comments.length > 0 && (
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th>削除</th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  コメント投稿者名
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  コメント内容
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  コメント日時
                </th>
              </tr>
            </thead>
            <tbody>
              {work.comments.map((comment) => (
                <CommentListRow
                  key={comment.id}
                  comment={comment}
                  beginDeleteAction={() => {
                    setDeleteComment(comment);
                    setModalOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
