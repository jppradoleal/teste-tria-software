import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add } from 'src/core/store/cart.store';
import Comic from '../../core/models/comic.model';
import { ComicsService } from '../../core/services/comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  comics: Comic[] = [];
  cart$:Observable<Comic[]>;


  private start = 0;
  private limit = 12;

  constructor(
    private comicsService: ComicsService,
    private store: Store<{ cart: Comic[] }>
  ) {
    this.cart$ = store.select('cart');
  }

  addToCart(item: Comic) {
    console.log(item);
    this.store.dispatch(add({comic: item}));
  }

  ngOnInit() {
    this.cart$.subscribe(data => {
      console.log(data);
    })

    this.comicsService.getComics(0, 12).subscribe((response) => {
      this.comics = response.data.results;
    });
  }

  onScroll() {
    this.start += this.limit;
    this.comicsService
      .getComics(this.start, this.limit)
      .subscribe((response) => {
        this.comics.push(...response.data.results);
      });
  }
}
