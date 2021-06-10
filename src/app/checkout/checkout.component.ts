import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Comic from 'src/core/models/comic.model';
import { remove } from 'src/core/store/cart.store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  discount: string = "";
  total: number = 0;
  comics$: Observable<Comic[]>;

  constructor(private store: Store<{ cart: Comic[] }>) {
    this.comics$ = store.select('cart');
  }

  remove(comic: Comic) {
    this.store.dispatch(remove({comic}))
  }

  checkDiscount() {
    console.log("Discount checked: " + this.discount);
    return true;
  }

  ngOnInit(): void {
    this.comics$.subscribe(data => {
      this.total = data.map(v => v.prices[0].price).reduce((total, value) => total + value);
    })
  }

}
