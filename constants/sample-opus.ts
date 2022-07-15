import { comments } from "@constants/sample-comments";

export const opuses: Opus[] = [
  {
    id: 1,
    title: "トップページ",
    artist: {
      name: "村上ぺこ",
      workedAt: 2018,
      graduatedAt: 2022,
    },
    thumb: "/samples/1.png",
    image: "/samples/4_large.png",
    description: `何処かの漫画同好会の非公式パネル展示会です。
    7月1日から31日までの間に
    募った作品を展示しています。`,
    comments: [...comments],
  },
  {
    id: 2,
    title: "日登",
    artist: {
      name: "赤ぴょん",
      workedAt: 2018,
      graduatedAt: 2022,
    },
    thumb: "/samples/2.png",
    image: "/samples/4_large.png",
    description: "ああああああああああああああああああああああああああ",
    comments: [...comments],
  },
  {
    id: 3,
    title: "gekkou.",
    artist: {
      name: "みりん",
      workedAt: 2018,
      graduatedAt: 2022,
    },
    thumb: "/samples/3.png",
    image: "/samples/4_large.png",
    description: "ああああああああああああああああああああああああああ",
    comments: [...comments],
  },
  {
    id: 4,
    title: "大型チェーンソ",
    artist: {
      name: "はるいろすーぴ",
      workedAt: 2018,
    },
    thumb: "/samples/4.png",
    image: "/samples/4_large.png",
    description: "ああああああああああああああああああああああああああ",
    comments: [...comments],
  },
  {
    id: 5,
    title: "武装",
    artist: {
      name: "ななた",
      workedAt: 2018,
    },
    thumb: "/samples/5.png",
    image: "/samples/4_large.png",
    description: "ああああああああああああああああああああああああああ",
    comments: [...comments],
  },
  {
    id: 6,
    title: "灰色アンダー",
    artist: {
      name: "ゴマ同歩",
      workedAt: 2018,
    },
    thumb: "/samples/2.png",
    image: "/samples/4_large.png",
    description: "ああああああああああああああああああああああああああ",
    comments: [...comments],
  },
];
