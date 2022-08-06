import { useState } from "react";
import dayjs from "dayjs";

import { DeleteIcon } from "@components/atoms/icons/delete-icon";
import { Modal } from "@components/atoms/modal/modal";

interface ArtistListProps {
  artists: Artist[];
  deleteArtist: (artistId: string) => void;
}

export const ArtistList: React.FC<ArtistListProps> = ({
  artists,
  deleteArtist,
}) => {
  const [deleteTargetArtist, setDeleteArtist] = useState<Artist | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="overflow-hidden">
      <Modal id="test-modal" title="Confirm" isOpen={modalOpen}>
        <div className="p-6 space-y-6 text-white">
          {deleteTargetArtist?.name} さんを削除しますか?
        </div>
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => {
              if (!deleteTargetArtist?.id) {
                setModalOpen(false);
                return;
              }
              deleteArtist(deleteTargetArtist?.id);
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
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th>削除</th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              名前
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              卒業年度
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
          {artists.map((artist) => {
            return (
              <tr key={artist.id}>
                <td
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  <button
                    onClick={() => {
                      setDeleteArtist(artist);
                      setModalOpen(true);
                    }}
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
                  {artist.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {artist.graduatedAt}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(artist.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(artist.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
