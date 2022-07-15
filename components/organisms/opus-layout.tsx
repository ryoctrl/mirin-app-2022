import Image from "next/image";
import { useState } from "react";

import { opuses } from "@constants/sample-opus";

type Props = {
  opus: Opus;
};

export const OpusLayout: React.FC<Props> = (props) => {
  const { opus } = props;

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const registerComment = () => {
    const o = opuses.find((o) => o.id === opus.id);
    if (!o) return;
    if (!name || !text) return;
    const newId = opus.comments.length + 1;
    o.comments.push({
      id: newId,
      name,
      text,
    });
    setName("");
    setText("");
    const { activeElement } = document;
    if (!activeElement) return;
    (activeElement as HTMLElement).blur();
  };

  return (
    <div className="layout">
      <div className="opus-container">
        <div className="image-wrapper">
          <Image
            src={opus.image}
            layout="fill"
            alt={opus.title}
            className="image"
          />
        </div>
        <div className="text-container">
          <div className="text-title">
            <span>{opus.title}</span>
          </div>
          <div className="text-artist-info">
            <div>
              <span>{opus.artist.name}</span>
            </div>
            <div>
              {opus.artist.graduatedAt && (
                <span>卒業年: {opus.artist.graduatedAt}</span>
              )}
              <span>制作年: {opus.artist.workedAt}</span>
            </div>
          </div>
          <div className="text-description">
            {opus.description.split("\n").map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <hr />
      <div>
        <div>コメント</div>

        <div className="inputs">
          <input
            className="name-input"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="text-input"
            placeholder="コメントする..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              registerComment();
            }}
          />
        </div>
      </div>

      <div>
        {opus.comments
          .sort((a, b) => b.id - a.id)
          .map((comment) => (
            <div key={comment.id} className="comment">
              <div>{comment.name}</div>
              <div>{comment.text}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
