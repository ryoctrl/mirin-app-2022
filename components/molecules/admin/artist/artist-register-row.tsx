import { useArtists } from "hooks/artists/use-artists";

interface ArtistRegisterRowProps {
  artist: Partial<Artist>;
  updateNewArtist: (artist: Partial<Artist>) => void;
  createArtist: (artist: Artist) => void;
}

export const ArtistRegisterRow: React.FC<ArtistRegisterRowProps> = ({
  artist,
  updateNewArtist,
  createArtist,
}) => {
  const { artistsState } = useArtists();

  const onClickRegister = () => {
    if (!artist.name || !artist.admittedAt) return;
    const newArtist: Artist = {
      name: artist.name,
      social: artist.social,
      admittedAt: artist.admittedAt,
    };
    createArtist(newArtist);
  };

  const isCreateActive = artist.name && !artistsState.create.isCreating;
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
          placeholder="アーティスト名"
          value={artist.name}
          onChange={(e) => updateNewArtist({ name: e.target.value })}
        />
      </td>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        <div className="my-2">
          <input
            className="appearance-none border rounded  py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="graduate"
            type="number"
            min="2000"
            max="2030"
            value={artist.admittedAt}
            onChange={(e) => {
              const admittedAt = Number(e.target.value);
              updateNewArtist({ admittedAt });
            }}
          />
        </div>
      </td>
      <td
        scope="col"
        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
      >
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          id="twitter"
          type="text"
          placeholder="@twitter_id"
          value={artist.social?.twitter}
          onChange={(e) =>
            updateNewArtist({ social: { twitter: e.target.value } })
          }
        />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
      <td
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        colSpan={2}
      >
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-sky-200"
          type="button"
          disabled={!isCreateActive}
          onClick={onClickRegister}
        >
          {artistsState.create.isCreating
            ? "アーティストを登録中..."
            : "新しいアーティストを登録"}
        </button>
      </td>
    </tr>
  );
};
