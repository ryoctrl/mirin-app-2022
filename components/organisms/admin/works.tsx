import dayjs from "dayjs";

interface WorksListProps {
  works: Work[];
}

export const WorksList: React.FC<WorksListProps> = ({ works }) => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              タイトル
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              作者
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
          {works.map((work) => {
            return (
              <tr key={work.id}>
                <td
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  {work.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {work.title}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {work.artist.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(work.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {dayjs(work.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
