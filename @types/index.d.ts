declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * google analytics id
     */
    readonly NEXT_PUBLIC_GA_ID: string;
  }
}

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
  social?: {
    twitter?: string;
  };
  admittedAt: number;
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

type ImageInfo = {
  file?: File;
  url: string;
  height: number;
  width: number;
};

type Exhibition = {
  id?: string;
  title: string;
  isActive: boolean;
  heroImage: {
    pc: string;
    sp: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
