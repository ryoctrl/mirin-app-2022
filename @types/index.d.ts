declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * google analytics id
     */
    readonly NEXT_PUBLIC_GA_ID: string;

    /**
     * A flag represents the developer mode is activated.
     */
    readonly NEXT_PUBLIC_DEV_MODE: string;
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
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Work model needs to be able to re-order in illusts list page (/admin).
 * This application realize it using react-sortablejs, then it requires the unique model.
 * ref: https://github.com/SortableJS/react-sortablejs
 */
type SortableWork = {
  id: number;
  work: Work;
  chosen?: boolean;
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
  inPeriod: boolean;
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

type StoredFile = {
  name: string;
  url: string;
  path: string;
  getBlob: () => Promise<Blob>;
};
