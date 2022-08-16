import { useState } from "react";

interface RegisterArtistProps {
  createArtist: (artist: Artist) => void;
}

export const RegisterArtist: React.FC<RegisterArtistProps> = ({
  createArtist,
}) => {
  const [name, setName] = useState("");
  const [isGraduated, setIsGraduated] = useState(false);
  const [graduate, setGraduate] = useState(2020);
  const [twitter, setTwitter] = useState("");

  const executeRegister = () => {
    const artist: Artist = {
      name,
    };
    if (isGraduated) {
      artist.graduatedAt = graduate;
    }
    createArtist(artist);
  };

  return (
    <form className="w-full">
      <div className="mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          名前
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="hogehoge"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <div className="w-full">
          <label className="text-gray-700 text-sm font-bold mb-2">
            卒業済み?
          </label>
          <input
            type="checkbox"
            className=" border rounded py-2 mx-3"
            checked={isGraduated}
            onChange={(e) => setIsGraduated(e.target.checked)}
          />
        </div>
        {isGraduated && (
          <>
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="graduate"
            >
              卒業年度
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="graduate"
              type="number"
              min="2000"
              max="2030"
              disabled={!isGraduated}
              value={graduate}
              onChange={(e) => {
                const graduate = Number(e.target.value);
                setGraduate(isNaN(graduate) ? 2020 : graduate);
              }}
            />
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={executeRegister}
        >
          登録
        </button>
      </div>
    </form>
  );
};
