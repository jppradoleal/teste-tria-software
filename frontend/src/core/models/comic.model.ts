import { Rarity } from "./enum/rarity.enum";

export default interface Comic {
  id: number;
  title: string;
  description: string;
  modified: Date;
  pageCount: number;
  resourceURI: string;
  rarity?: Rarity,
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: {
      name: string;
    };
  };
  prices: {
    price: number;
  }[];
}
