import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Comic from '../../core/models/comic.model';
import { ComicsService } from '../../core/services/comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  comics: Comic[] = [];
  @Input() version = '';

  private start = 0;
  private limit = 12;

  constructor(private comicsService: ComicsService) {}

  ngOnInit() {
    this.comicsService.getComics(0, 12).subscribe(response => {
      this.comics = response.data.results;
    });
  }

  onScroll() {
    this.start += this.limit;
    this.comicsService.getComics(this.start, this.limit).subscribe(response => {
      this.comics.push(...response.data.results);
    });
  }
}
