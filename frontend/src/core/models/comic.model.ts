export default interface Comic {
  id: number;
  title: string;
  description: string;
  modified: Date;
  pageCount: number;
  resourceURI: string;
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
