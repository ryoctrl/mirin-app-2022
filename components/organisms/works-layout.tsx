import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useWorks } from "hooks/works/useWorks";
import { WrapLink } from "@components/atoms/wrap-link";
import { TwitterIcon } from "@components/atoms/icons/twitter-icon";

type Props = {
  work: Work;
};

const useAutoResizeTextArea = (value: string | undefined) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { borderTopWidth, borderBottomWidth } = getComputedStyle(element);

    element.style.height = "40px";
    element.style.height = `calc(${element.scrollHeight}px + ${borderTopWidth} + ${borderBottomWidth})`;
  }, [value]);

  return ref;
}

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

  const textAreaRef = useAutoResizeTextArea(text);

  const hasComments = !!work.comments.length;

  return (
    <div className="layout">
      <div className="work-wrapper">
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
                <span>入学年：{work.artist.admittedAt}　</span>
                <span>制作年：{work.workedAt}</span>
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
          <div className="comment-title">コメント</div>
          <div className="inputs-wrapper">
            <div className="inputs">
              <input
                className="name-input"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="text-input"
                placeholder="コメントする..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                ref={textAreaRef}
              />
            </div>
            <button className="submit-btn" onClick={() => registerComment()}></button>
          </div>
        </div>

        <div>
          {!hasComments && <span>コメントはまだありません。</span>}
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
    </div>
  );
};
