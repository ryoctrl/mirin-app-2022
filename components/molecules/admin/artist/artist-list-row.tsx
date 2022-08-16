import dayjs from "dayjs";

import { DeleteIcon } from "@components/atoms/icons/delete-icon";
import { WrapLink } from "@components/atoms/wrap-link";

interface ArtistListRowProps {
  artist: Artist;
  beginDeleteAction: (artist: Artist) => void;
}

export const ArtistListRow: React.FC<ArtistListRowProps> = ({
  artist,
  beginDeleteAction,
}) => {
  return (
    <tr key={artist.id}>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
      >
        <button
          onClick={() => beginDeleteAction(artist)}
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
    </tr>
  );
};
