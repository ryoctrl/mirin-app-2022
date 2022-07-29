import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { useWorks } from "hooks/works/useWorks";
import { useArtists } from "hooks/artists/use-artists";
import { useUser } from "hooks/users/useUser";

const Admin: NextPage = () => {
  const { artistsState, createArtist } = useArtists();
  const { worksState, createWork } = useWorks();

  const { isLoggedIn } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [graduate, setGraduate] = useState("");

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState<Artist | null>(null);
  const [workedAt, setWorkedAt] = useState("");
  const [thumb, setThumb] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isLoggedIn()) return;
    router.replace("/admin/login");
  }, []);

  const onClickExecute = () => {
    createArtist({
      name,
      graduatedAt: isNaN(Number(graduate)) ? undefined : Number(graduate),
    });
  };

  const registerWork = () => {
    if (!artist) return;
    if (!workedAt || isNaN(Number(workedAt))) return;
    createWork({
      title,
      artist,
      workedAt: Number(workedAt),
      thumb,
      image,
      description,
      comments: [],
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>KUMD海賊版パネル展示会</title>
        <meta name="description" content="KUMD海賊版パネル展示会" />
      </Head>

      <main className={styles.main}>
        <h1>Artists</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>graduatedAt</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {artistsState.artists.map((artist) => {
              return (
                <tr key={artist.id}>
                  <td>{artist.id}</td>
                  <td>{artist.name}</td>
                  <td>{artist.graduatedAt}</td>
                  <td>{artist.createdAt?.toLocaleString()}</td>
                  <td>{artist.updatedAt?.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <label htmlFor="name-input">Name</label>
        <input
          id="name-input"
          placeholder="hogehoge"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="graduate-input">GraduatedAt</label>
        <input
          id="graduate-input"
          type="number"
          min="1900"
          max="2099"
          step="1"
          value={graduate}
          onChange={(e) => setGraduate(e.target.value)}
        />
        <button type="submit" onClick={onClickExecute}>
          登録
        </button>
        <h1>Works</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Artist</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {worksState.works.map((work) => {
              return (
                <tr key={work.id}>
                  <td>{work.id}</td>
                  <td>{work.title}</td>
                  <td>{work.artist.name}</td>
                  <td>{work.createdAt?.toLocaleString()}</td>
                  <td>{work.updatedAt?.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <label htmlFor="title-input">title</label>
        <input
          id="title-input"
          placeholder="hogehoge"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="artist-input">title</label>
        <select
          id="artist-input"
          value={artist?.id}
          onChange={(e) =>
            setArtist(
              artistsState.artists.find((a) => a.id === e.target.value) ?? null
            )
          }
        >
          <option>Please select</option>
          {artistsState.artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
        <label htmlFor="worked-input">WorkedAt</label>
        <input
          id="worked-input"
          type="number"
          min="1900"
          max="2099"
          step="1"
          value={workedAt}
          onChange={(e) => setWorkedAt(e.target.value)}
        />
        <label htmlFor="thumb-input">Thumb</label>
        <input
          id="thumb-input"
          value={thumb}
          onChange={(e) => setThumb(e.target.value)}
        />
        <label htmlFor="image-input">ImageURL</label>
        <input
          id="image-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="description-input">Description</label>
        <input
          id="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" onClick={registerWork}>
          登録
        </button>
      </main>
    </div>
  );
};

export default Admin;
