import Comic from './comic.model';

export default interface CartStoreModel {
  comics: Comic[];
  total: number;
  usedDiscount: boolean;
}
