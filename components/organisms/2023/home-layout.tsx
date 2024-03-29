import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@components/molecules";
import { HeaderMenu } from "@components/molecules";
import { WorksState } from "hooks/works/state";
import { HeaderScrollRefs, scroll } from "libs/utils/header";
import { convertWorksToSortableWorks } from "libs/utils";
import { OutOfPeriod } from "@components/molecules/out-of-period";
import { PopUpMenu2023 } from "@components/molecules/2023/popup-menu";

type Props = {
  worksState: WorksState;
  inPeriod: boolean;
};

export const HomeLayout2023: React.FC<Props> = ({ worksState, inPeriod }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="pc left-scroll" id="left">
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
      </div>
      <div id="center">
        <header className="flex">
          <a>
            <img src="./2023/img/img-logo.webp" width="113px" height="15px" />
          </a>
          <div>
            <a>
              <div className="menu">
                <div className="top-menu" onClick={() => setIsMenuOpen(true)}>
                  <div className="menu-border"></div>
                  <div className="menu-border"></div>
                </div>
                <div className="bottom-menu"></div>
              </div>
              <PopUpMenu2023
                isOpen={isMenuOpen}
                close={() => setIsMenuOpen(false)}
              />
            </a>
          </div>
        </header>
        <main>
          <section id="top" ref={ HeaderScrollRefs.TOP } >
            <img src="./2023/img/bg-top.webp" width="390px" height="614px" />
            <div className="scroll-text-wrapper">
              <div className="scroll-text flex">
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
              </div>
              <div className="scroll-text2 flex">
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
                <img src="./2023/img/text-scroll.webp" width="245px" />
              </div>
            </div>
          </section>
          <div id="arrow-connect">
            <img src="./2023/img/icon-arrow9.webp" width="35.7px" onClick={() => scroll(HeaderScrollRefs.ABOUT)} />
          </div>
          <section id="about" className="section" ref={ HeaderScrollRefs.ABOUT } >
            <h2>
              <img
                src="./2023/img/img-about-h.webp"
                width="371px"
                height="165px"
              />
            </h2>
            <div className="about-content">
              <div>
                <p>
                  KUMD海賊版パネル展示会は
                  <br />
                  現回生OBOG問わず、様々な世代の漫画同好会員が
                  <br />
                  イラスト漫画を通じ、公開鑑賞交流しあえることを
                  <br />
                  目的として開催したイベントです.
                </p>
                <p className="about-text">
                  2023年は第2回
                  <br />
                  比較的 様々な試みに挑戦しています.
                  <br />
                  その一部となって楽しんでいただるととても嬉しいです.
                </p>
                <p>現在は 2023.06~08 の期間に募集した作品を展示しています。</p>
              </div>
              <img
                className="about-text-img"
                src="./2023/img/img-text-about.webp"
                width="290px"
              />
            </div>
            <div className="about-arrow">
              <img src="./2023/img/icon-arrow6.webp" width="35.71px" />
            </div>
          </section>
          <section id="D" className="section">
            <h2>
              <img
                src="./2023/img/img-d-h.webp"
                width="371px"
                height="165px"
              />
            </h2>
            <div className="d-content">
              <div className="d-arrow">
                <img src="./2023/img/icon-arrow6.webp" width="35.71px" />
              </div>
              <div className="d-text-wrapper">
                <div>
                  <p>
                    第二回海賊版パネ展はWEBサイトだけでなく
                    <br />
                    メタバース空間においても展示を行なっています
                  </p>
                  <p className="d-text">
                    開催場所は cluster
                    <br />
                    下記のボタンより展示会場へと遷移します.
                  </p>
                  <p>
                    様々なアバターに身を包み、
                    <br />
                    是非新たなパネル展示会をお楽しみください.
                  </p>
                </div>
                <img
                  className="d-text-img"
                  src="./2023/img/img-text-3d.webp"
                  width="283px"
                />
              </div>
            </div>
            <div className="go-button" >
              <a href="https://cluster.mu/w/ec1c8bd7-e772-4672-943d-b01536f53f2a" target="_blank" rel="noreferrer" >
                <img
                  src="./2023/img/img-butoon.webp"
                  width="145px"
                  height="41px"
                />
              </a>
            </div>
          </section>
          <section id="staff">
            <h2>
              <img src="./2023/img/img-staff-h.webp" width="187px" />
            </h2>
            <div className="flex">
              <div className="flex staff-text">
                <p className="staff-margin">
                  Design
                  <br />
                  Engineering
                  <br />
                  Top picture
                </p>
                <p>
                  みりん
                  <br />
                  mosin つんぱ。
                  <br />
                  ななた
                </p>
              </div>
              <img src="./2023/img/img-staff.webp" width="150px" />
            </div>
            <div id="chara">
              <img src="./2023/img/img-chara.webp" width="339px" />
            </div>
          </section>
          <div id="arrow-connect">
            <a>
              <img src="./2023/img/icon-arrow9.webp" width="35.7px" onClick={() => scroll(HeaderScrollRefs.SPECIAL)} />
            </a>
          </div>
          <section id="special" ref={ HeaderScrollRefs.SPECIAL }>
            <h2 className="h-bottom">
              <img src="./2023/img/img-special-h.webp" width="265px" />
            </h2>
            <div>
              <article className="special-img special-img-right">
                <a>
                  <img
                    src="./2023/img/img-special1.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
              <article className="special-img">
                <a>
                  <img
                    src="./2023/img/img-special2.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
              <article className="special-img special-img-right">
                <a>
                  <img
                    src="./2023/img/img-special3.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
              <article className="special-img">
                <a>
                  <img
                    src="./2023/img/img-special4.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
              <article className="special-img special-img-right">
                <a>
                  <img
                    src="./2023/img/img-special5.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
              <article className="special-img">
                <a>
                  <img
                    src="./2023/img/img-special6.webp"
                    width="375px"
                    height="200px"
                  />
                </a>
              </article>
            </div>
            <p className="special-author" >art by  時雨 , ほったん , cacao , 天 , ましゅ , ゆづき</p>
            <p>
              開催まで約6週間に渡り、寄稿していただいたイラストを
              <br />
              順次公開してきました。超超感謝
            </p>
          </section>
          <section id="works" ref={ HeaderScrollRefs.GALLERY }>
            <h2 className="h-bottom">
              <img src="./2023/img/img-works-h.webp" width="250px" />
            </h2>
            {worksState.isLoading && <span>Now Loading...</span>}
            {!inPeriod && <OutOfPeriod />}
            {inPeriod &&
              convertWorksToSortableWorks(worksState.works).map(
                ({ work }, idx) => {
                  return (
                    <article key={idx + 1}>
                      <Link href={`/works/${work.id}`}>
                        <Image
                          src={work.thumb}
                          alt={work.title}
                          width="480px"
                          height="300px"
                          layout="responsive"
                        />
                      </Link>
                      <div>
                        <div className="flex">
                          <div className="work-index">
                            {`0${idx + 1}`.slice(-2)}
                          </div>
                          <div className="text12">
                            <h3>{work.title}</h3>
                            <p>PN:{work.artist.name}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
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
          <img src="./2023/img/qr.png" />
        </div>
      </div>
      <div id="right" className="pc right-scroll">
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
        <img src="./2023/img/side-text.webp" width="185px" />
      </div>
    </>
  );
};
