import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@components/molecules";
import { HeaderMenu } from "@components/molecules";
import { WorksState } from "hooks/works/state";
import { HeaderScrollRefs, scroll } from "libs/utils/header";

type Props = {
  worksState: WorksState;
};

export const HomeLayout: React.FC<Props> = ({ worksState }) => {
  return (
    <div className="layout">
      <HeaderMenu></HeaderMenu>
      <div className="section-about" ref={HeaderScrollRefs.ABOUT}>
        <SectionTitle>はじめに</SectionTitle>

        <div className="description">
          <p>KUMD海賊版パネル展示会は</p>
          <p>現回生OBOG問わず、様々な世代の漫画同好会が</p>
          <p>イラスト漫画を通じ、公開鑑賞交流しあえることを</p>
          <br/>
          <p>目的として開催したイベントです.</p>
        </div>
        <div className="description">
          <img
            src="/KUMD.svg"
            className="description-logo"
          />
          <p>
            現在は<span className="black-background">2022.06~08</span>の期間に募集した
          </p>
          <p>作品を展示しています。</p>
        </div>

        <div className="members">
          <div className="authors-table">
            <div className="author">
              <span>Design</span>
              <span>みりん</span>
            </div>
            <div className="author">
              <span>Engineering</span>
              <span>藤井遼 つんぱ。</span>
            </div>
            <div className="author">
              <span>Top picture</span>
              <span>cacao</span>
            </div>
            <div className="scroll-bar" onClick={() => scroll(HeaderScrollRefs.GALLERY)}>
              <div className="bar"></div>
              <p>scroll</p>
            </div>
          </div>

          <div className="news-contents">
            <div className="news">
              coming soon
            </div>
            <div className="news">
              coming soon
            </div>
          </div>
        </div>
      </div>

      <div ref={HeaderScrollRefs.GALLERY}>
        <SectionTitle>GALLERY</SectionTitle>
        <div className="opus-wrapper">
          {worksState.isLoading && <span>Now Loading...</span>}
          {worksState.works.map((work, idx) => {
            return (
              <Link key={idx + 1} href={`/works/${work.id}`}>
                <div className="opus">
                  <div className="thumb-wrapper">
                    <Image
                      className="thumb"
                      src={work.thumb}
                      alt={work.title}
                      width="100%"
                      height="100%"
                      layout="responsive"
                    />
                  </div>
                  <div className="text-wrapper">
                    <p className="text-artist">{work.artist.name}</p>
                    <p className="text-title">{work.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
