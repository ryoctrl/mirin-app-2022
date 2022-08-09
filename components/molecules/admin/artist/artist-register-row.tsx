import { useState } from "react";

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
  const [isGraduated, setIsGraduated] = useState(false);
  const { artistsState } = useArtists();

  const onClickRegister = () => {
    if (!artist.name) return;
    const newArtist: Artist = {
      name: artist.name,
    };
    if (isGraduated && artist.graduatedAt) {
      newArtist.graduatedAt = artist.graduatedAt;
    }
    createArtist(newArtist);
  };

  const isCreateActive = artist.name && !artistsState.create.isCreating;
  return (
    <tr>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
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
          <label className="text-gray-700 text-sm font-bold mb-2 py-2">
            卒業済み?
          </label>
          <input
            type="checkbox"
            className=" border rounded py-2 mx-3"
            checked={isGraduated}
            onChange={(e) => setIsGraduated(e.target.checked)}
          />
          {isGraduated && (
            <input
              className="appearance-none border rounded  py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="graduate"
              type="number"
              min="2000"
              max="2030"
              disabled={!isGraduated}
              value={artist.graduatedAt}
              onChange={(e) => {
                const graduate = Number(e.target.value);
                updateNewArtist({ graduatedAt: graduate });
              }}
            />
          )}
        </div>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
