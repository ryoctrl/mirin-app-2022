import Image from "next/image";
import { useState } from "react";

import { useWorks } from "hooks/works/useWorks";
import { WrapLink } from "@components/atoms/wrap-link";
import { TwitterIcon } from "@components/atoms/icons/twitter-icon";

type Props = {
  work: Work;
};

export const WorksLayout: React.FC<Props> = (props) => {
  const { work } = props;
  const { addComment } = useWorks();

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const registerComment = () => {
    if (!name || !text) return;
    if (!work.id) return;

    addComment(work.id, {
      name,
      text,
    });

    setName("");
    setText("");
    const { activeElement } = document;
    if (!activeElement) return;
    (activeElement as HTMLElement).blur();
  };

  const hasComments = !!work.comments.length;

  return (
    <div className="layout">
      <div className="opus-container">
        <div className="image-wrapper">
          <Image
            src={work.image}
            layout="fill"
            alt={work.title}
            className="image"
          />
        </div>
        <div className="text-container">
          <div className="text-title">
            <span>{work.title}</span>
          </div>
          <div className="text-artist-info">
            <div>
              <span>{work.artist.name}</span>
            </div>
            <div>
              {work.artist.graduatedAt && (
                <span>卒業年: {work.artist.graduatedAt}</span>
              )}
              <span>制作年: {work.workedAt}</span>
            </div>
          </div>
          {work.artist.social && (
            <div className="text-social-link">
              <div className="social-link">
                <WrapLink
                  path={`https://twitter.com/${work.artist.social?.twitter}`}
                  outerLink={true}
                >
                  <button className="social-link">
                    <TwitterIcon />
                  </button>
                </WrapLink>
              </div>
            </div>
          )}
          <div className="text-description">
            {work.description.split("\n").map((p, idx) => (
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
        {!hasComments && <span>コメントはまだ無いよ ノシ</span>}
        {hasComments &&
          Object.values(work.comments)
            .reverse()
            .map((comment, idx) => (
              <div key={idx} className="comment">
                <div>{comment.name}</div>
                <div>{comment.text}</div>
              </div>
            ))}
      </div>
    </div>
  );
};
