import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ReactSortable } from "react-sortablejs";

import { Modal } from "@components/atoms/modal/modal";
import { generatePath } from "libs/utils/route-utils";
import { routes } from "libs/routes";
import { useWorks } from "hooks/works/useWorks";
import { convertWorksToSortableWorks } from "libs/utils";
import { useStoredFile } from "hooks/stored-files/use-stored-file";
import { useExhibitions } from "hooks/exhibitions/use-exhibitions";

interface WorksListProps {
  works: Work[];
  deleteWork: (work: Work) => void;
}

export const StorageList: React.FC<WorksListProps> = ({
  works,
  deleteWork,
}) => {
  const { storedFileState, deleteFile } = useStoredFile();
  const [deleteTargetFile, setDeleteFile] = useState<StoredFile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { worksState } = useWorks();
  const { exhibitionsState } = useExhibitions();

  return (
    <div className="overflow-hidden flex flex-1">
      <Modal id="test-modal" title="Confirm" isOpen={modalOpen}>
        <div className="p-6 space-y-6 text-white">
          {deleteTargetFile?.path} を削除しますか?
        </div>
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => {
              if (!deleteTargetFile) {
                setModalOpen(false);
                return;
              }
              deleteFile(deleteTargetFile);
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
      <div className="overflow-y-auto w-full h-full">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Path
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                ファイルプレビュー
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                使用中
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                使用中のリソース
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                削除
              </th>
            </tr>
          </thead>
          <tbody>
            {storedFileState.storedFiles.map((file) => {
              const usingWork = worksState.works.find((w) =>
                [w.image, w.thumb].includes(file.url)
              );
              const usingExhibition = exhibitionsState.exhibitions.find(
                (exhibition) =>
                  [exhibition.heroImage.pc, exhibition.heroImage.sp].includes(
                    file.url
                  )
              );

              const usedInAnywhere = !!usingWork || !!usingExhibition;

              const usedBy = usingWork
                ? `イラスト: ${usingWork.title}`
                : usingExhibition
                ? `展示会設定: ${usingExhibition.title}`
                : ``;

              const usedLink = usingWork
                ? generatePath(routes.ADMIN_ILLUST_DETAIL, {
                    id: usingWork.id ?? "",
                  })
                : usingExhibition
                ? routes.ADMIN_EXHIBITION_SETTINGS
                : "";
              return (
                <tr key={file.path}>
                  <td
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {file.path}
                  </td>
                  <td
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    <div className="relative w-16 h-16">
                      <Image alt={file.path} src={file.url} layout="fill" />
                    </div>
                  </td>
                  <td
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {usedInAnywhere ? "使用中" : "使用なし"}
                  </td>
                  <td
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {usedLink && (
                      <Link href={usedLink}>
                        <button
                          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-sky-200"
                          type="button"
                        >
                          {usedBy}へ
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-red-200"
                      type="button"
                      disabled={usedInAnywhere}
                      onClick={(e) => {
                        e.preventDefault();
                        if (usedInAnywhere) {
                          return;
                        }
                        setDeleteFile(file);
                        setModalOpen(true);
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
