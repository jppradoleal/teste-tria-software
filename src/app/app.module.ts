import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CardComponent } from 'src/core/components/card/card.component';
import { ComicsService } from 'src/core/services/comics.service';
import {HeaderComponent} from '../core/components/header/header.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { cartReducer } from '../core/reducers/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    StoreModule.forRoot({
      cart: cartReducer
    })
  ],
  providers: [ComicsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
