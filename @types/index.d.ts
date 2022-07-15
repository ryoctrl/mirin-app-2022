type Artist = {
  name: string;
  workedAt?: number;
  graduatedAt?: number;
};

type OpusComment = {
  id: number;
  name: string;
  text: string;
  postAt?: Date;
};

type Opus = {
  id: number;
  title: string;
  artist: Artist;
  thumb: string;
  image: strin;
  description: string;
  comments: OpusComment[];
};
