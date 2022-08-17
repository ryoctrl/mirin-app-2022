import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@components/molecules";
import { WorksState } from "hooks/works/state";
import { convertWorksToSortableWorks } from "libs/utils";

type Props = {
  worksState: WorksState;
};

export const HomeLayout: React.FC<Props> = ({ worksState }) => {
  return (
    <div className="layout">
      <h1 className="logo-font">KUMD</h1>
      <div className="section-about">
        <SectionTitle>はじめに</SectionTitle>

        <div>
          <p>KUMD海賊版パネル展示会は</p>
          <p>現回生OBOG問わず、さまざまな世代の漫画同好会が</p>
          <p>イラスト漫画を通じ、公開鑑賞交流しあえることを</p>
          <p>目的として開催したイベントです.</p>
        </div>
        <div className="description">
          <div className="description-logo"></div>
          <p>
            現在は<span>2022.06~08</span>の期間に募集した
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
              <span>つんぱ。</span>
            </div>
            <div className="author">
              <span>Top picture</span>
              <span>cacao</span>
            </div>
          </div>

          <div className="artists-table">
            <div>Artists</div>
            <div className="artists">
              {Array.from(
                new Set(worksState.works.map((work) => work.artist))
              ).map((artist, idx) => (
                <span key={idx}>{artist.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <SectionTitle>作品一覧</SectionTitle>

        <div>
          {worksState.isLoading && <span>Now Loading...</span>}
          {convertWorksToSortableWorks(worksState.works).map(
            ({ work }, idx) => {
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
                      <p className="text-title">{work.title}</p>
                      <p className="text-artist">{work.artist.name}</p>

                      <p className="text-description">{work.description}</p>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
