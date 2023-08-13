import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useWorks } from "hooks/works/useWorks";
import { WrapLink } from "@components/atoms/wrap-link";
import { TwitterIcon } from "@components/atoms/icons/twitter-icon";
import { PopUpMenu2023 } from "@components/molecules/2023/popup-menu";

type Props = {
  work: Work;
};

const useAutoResizeTextArea = (value: string | undefined) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { borderTopWidth, borderBottomWidth } = getComputedStyle(element);

    element.style.height = "20px";
    element.style.height = `calc(${element.scrollHeight}px + ${borderTopWidth} + ${borderBottomWidth})`;
  }, [value]);

  return ref;
};

export const WorksLayout2023: React.FC<Props> = (props) => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="pc left-scroll" id="left">
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
      </div>
      <div id="center">
        <header className="flex">
          <a>
            <img src="/2023/img/img-logo.webp" width="113px" height="15px" />
          </a>
          <div>
            <a>
              <div className="menu">
                <div className="top-menu">
                  <div className="menu-border"></div>
                  <div className="menu-border"></div>
                </div>
                <div className="bottom-menu"></div>
              </div>
            </a>
            <PopUpMenu2023
              isOpen={isMenuOpen}
              close={() => setIsMenuOpen(false)}
            />
            {/* <div className="menu menu-open">
              <div className="top-menu ">
                <a className="menu-x">
                  <img src="/2023/img/icon-x.webp" width="19px" />
                </a>
                <div className="flex">
                  <a href="./index.html#top">
                    <img src="/2023/img/text-top.webp" width="46px" />
                  </a>
                  <a href="./index.html#about">
                    <img src="/2023/img/text-about.webp" width="79px" />
                  </a>
                  <a href="./index.html#special">
                    <img src="/2023/img/text-special.webp" width="98px" />
                  </a>
                  <a href="./index.html#works">
                    <img src="/2023/img/text-gallery.webp" width="104px" />
                  </a>
                  <a href="">
                    <img src="/2023/img/text-3d.webp" width="119px" />
                  </a>
                </div>
              </div>
              <div className="bottom-menu"></div>
            </div> */}
          </div>
        </header>
        <main>
          <section id="work">
            <img className="work-img" src={work.image} />
            <div id="caption">
              <p className="text20">{work.title}</p>
              <div className="text12">
                <p>{work.artist.name}</p>
                <div className="flex year">
                  <p>{work.artist.admittedAt} 年入学</p>
                  <p>{work.workedAt} 年制作</p>
                </div>
              </div>
              <p>{work.description}</p>
            </div>
            <div id="comment" className="text10">
              <div>
                <div>
                  {!hasComments && (
                    <div id="comment-text" className="flex">
                      <span className="no-comment">
                        コメントはまだありません。
                      </span>
                    </div>
                  )}
                  {hasComments &&
                    Object.values(work.comments)
                      .reverse()
                      .map((comment, idx) => (
                        <div
                          key={comment.id}
                          id="comment-text"
                          className="flex"
                        >
                          <p className="name">{comment.name}</p>
                          <p className="comment">{comment.text}</p>
                        </div>
                      ))}
                </div>
                <div id="comment-send" className="flex">
                  <div className="flex">
                    <input
                      className="name"
                      placeholder="名前"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      className="comment"
                      placeholder="コメントする..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      ref={textAreaRef}
                    />
                  </div>
                  <a>
                    <button
                      className="submit-btn"
                      onClick={() => registerComment()}
                    >
                      <img src="/2023/img/icon-send.webp" width="18px" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="text10">
          <p>contact:mirin009.1111111@gmail.com</p>
          <p>©️ 2023 海賊パネ展</p>
        </footer>
      </div>
      <div id="qr" className="pc">
        <div>
          <p>
            本展示サイトはスマートフォンでの閲覧を推奨しています。
            <br />
            可能であれば下記QRからアクセスしてご覧ください。
          </p>
          <img />
        </div>
      </div>
      <div id="right" className="pc right-scroll">
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
        <img src="/2023/img/side-text.webp" width="185px" />
      </div>
    </>
  );
};
