type Artist = {
  name: string;
  graduatedAt?: number;
  createdAt: Date;
  updatedAt: Date;
};

type Work = {
  title: string;
  artist: Artist;
  workedAt: number;
  thumb: string;
  image: string;
  description: string;
  comments: WorksComment[];
  createdAt: Date;
  updatedAt: Date;
};

type WorksComment = {
  name: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
