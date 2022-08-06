type User = {
  id?: string;
  admin: boolean;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type Artist = {
  id?: string;
  name: string;
  graduatedAt?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type Work = {
  id?: string;
  title: string;
  artistId?: string;
  artist: Artist;
  workedAt: number;
  thumb: string;
  image: string;
  description: string;
  comments: WorksComment[];
  createdAt?: Date;
  updatedAt?: Date;
};

type WorksComment = {
  id?: string;
  name: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
};
