import dayjs from "dayjs";
import Link from "next/link";

import { WrapLink } from "@components/atoms/wrap-link";
import { generatePath } from "libs/utils/route-utils";
import { routes } from "libs/routes";

interface ArtistListRowProps {
  artist: Artist;
  beginDeleteAction: (artist: Artist) => void;
}

export const ArtistListRow: React.FC<ArtistListRowProps> = ({
  artist,
  beginDeleteAction,
}) => {
  return (
    <tr>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        {artist.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {artist.admittedAt}
      </td>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        {artist.social?.twitter && (
          <WrapLink
            path={`https://twitter.com/${artist.social?.twitter}`}
            outerLink={true}
          >
            <span>{artist.social.twitter}</span>
          </WrapLink>
        )}
        {!artist.social?.twitter && <span>設定なし</span>}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {dayjs(artist.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {dayjs(artist.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Link
          href={generatePath(routes.ADMIN_ARTIST_DETAIL, {
            id: artist.id || "",
          })}
        >
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-sky-200"
            type="button"
          >
            編集
          </button>
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-red-200"
          type="button"
          onClick={() => beginDeleteAction(artist)}
        >
          削除
        </button>
      </td>
    </tr>
  );
};
