import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from "../environment/config";
import ApiResponse from '../models/api-response.model';
import Comic from '../models/comic.model';

@Injectable()
export class ComicsService {
  constructor(private http: HttpClient) {}

  private apiKey = config.API_KEY;

  getComics(start: number, limit:number) {
    return this.http.get<ApiResponse>(`https://gateway.marvel.com:443/v1/public/comics?limit=${limit}&offset=${start}&apikey=${this.apiKey}`);
  }
}
