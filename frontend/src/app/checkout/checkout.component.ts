import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import CartStoreModel from 'src/core/models/cart-store.model';
import Comic from 'src/core/models/comic.model';
import { Rarity } from 'src/core/models/enum/rarity.enum';
import { addDiscount, remove } from 'src/core/store/cart.store';
import { environment } from 'src/environments/environment';

interface ApiCheckResponse {
  valid: boolean;
  rarity: Rarity;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent implements OnInit {
  discount: string = '';
  comics$: Observable<CartStoreModel>;
  private usedCoupon: boolean = false;

  constructor(
    private store: Store<{ cart: CartStoreModel }>,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.comics$ = store.select('cart');
  }

  remove(comic: Comic) {
    this.store.dispatch(remove({ comic }));
  }

  checkDiscount() {
    console.log('checking');
    this.http
      .get<ApiCheckResponse>(
        `${environment.apiUrl}/coupon/check?code=${this.discount}`
      )
      .subscribe(
        (response) => {
          this.store.dispatch(addDiscount({ discount: 10 }));
          this.toastr.success('10% Discount', 'Added coupon');
        },
        (error) => {
          this.toastr.error('Invalid coupon!', 'Invalid');
        }
      );
  }

  ngOnInit(): void {}
}
