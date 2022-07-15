import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@components/molecules";
import { opuses } from "@constants/sample-opus";

export const HomeLayout: React.FC = () => {
  return (
    <div className="layout">
      <h1>KUMD</h1>
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
              {Array.from(new Set(opuses.map((opus) => opus.artist))).map(
                (artist, idx) => (
                  <span key={idx}>{artist.name}</span>
                )
              )}
              <span>cacao</span>
              <span>つんぱ。</span>
              <span>ななた</span>
              <span>ほったん</span>
              <span>七竈</span>
              <span>シキアサギ</span>
              <span>cacao</span>
              <span>cacao</span>
              <span>cacao</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SectionTitle>作品一覧</SectionTitle>

        <div>
          {opuses.map((opus) => {
            return (
              <Link key={opus.id} href={`/opus/${opus.id}`}>
                <div className="opus">
                  <div className="thumb-wrapper">
                    <Image
                      className="thumb"
                      src={opus.thumb}
                      alt={opus.title}
                      width="100%"
                      height="100%"
                      layout="responsive"
                    />
                  </div>
                  <div className="text-wrapper">
                    <p className="text-title">{opus.title}</p>
                    <p className="text-artist">{opus.artist.name}</p>

                    <p className="text-description">{opus.description}</p>
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
