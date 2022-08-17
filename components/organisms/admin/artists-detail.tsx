import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useArtists } from "hooks/artists/use-artists";
import { routes } from "libs/routes";

interface ArtistDetailProps {
  artist: Artist;
}

export const ArtistDetail: React.FC<ArtistDetailProps> = ({ artist }) => {
  const { updateArtist } = useArtists();
  const [artistName, setArtistName] = useState(artist.name);
  const [admittedAt, setAdmittedAt] = useState(artist.admittedAt);
  const [twitter, setTwitter] = useState(artist.social?.twitter || "");
  const router = useRouter();

  const executeSave = () => {
    if (!artistName || isNaN(admittedAt)) {
      toast.error("アーティスト情報を正しく入力してください");
      return;
    }

    const newArtist = {
      ...artist,
      name: artistName,
      admittedAt,
    };

    if (!twitter) {
      delete newArtist.social;
    } else {
      newArtist.social = {
        twitter,
      };
    }
    const updateJob = updateArtist(newArtist);
    if (!updateJob) return;
    updateJob.then(() => {
      toast.success(`アーティスト ${artistName} さんを更新しました。`);
      router.push(routes.ADMIN_ARTISTS);
    });
  };
  return (
    <div className="flex h-full">
      <div className="flex-1 bg-white mx-4 radius flex justify-center py-8">
        <div className="w-1/2">
          <div className="my-2">
            <label htmlFor="name">アーティスト名</label>
            <input
              className="appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="アーティスト名"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="admitted-at">入学年度</label>
            <input
              className="appearance-none border rounded  w-full my-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="admitted-at"
              type="number"
              min="2000"
              max="2030"
              value={admittedAt}
              onChange={(e) => {
                const admittedAt = Number(e.target.value);
                setAdmittedAt(isNaN(admittedAt) ? 2020 : admittedAt);
              }}
            />
          </div>
          <div className="my-2">
            <label htmlFor="twitter">Twitter ID</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="twitter"
              type="text"
              placeholder="@twitter_id"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="my-2">
            <button
              className="w-full my-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-sky-200"
              type="button"
              onClick={executeSave}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
