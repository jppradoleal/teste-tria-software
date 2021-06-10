import Comic from "./comic.model";

export default interface ApiResponse {
  data: {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Comic[]
  }
}