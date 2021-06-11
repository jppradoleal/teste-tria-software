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
  valid: boolean; rarity: Rarity;
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
    this.http
      .get(`${environment.apiUrl}/coupon/check?code=${this.discount}`)
      .subscribe(
        (response) => {
          this.comics$.subscribe(data => {
            if(data.comics.map(v => v.rarity).some(v => v == response.rarity)) {
              this.store.dispatch(addDiscount({ discount: 10 }));
            }
          })
        },
        (error) => {
          this.toastr.error('Invalid coupon!', 'Invalid');
        }
      );
  }

  ngOnInit(): void {}
}
