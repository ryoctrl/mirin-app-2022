type Artist = {
  name: string;
  workedAt?: number;
  graduatedAt?: number;
};

type OpusComment = {
  name: string;
  text: string;
  postAt?: Date;
};

type Opus = {
  title: string;
  artist: Artist;
  thumb: string;
  image: strin;
  description: string;
  comments: { [key in string]: OpusComment };
};
