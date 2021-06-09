import { Component } from '@angular/core';
import Comic from 'src/core/models/comic.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  cart: Comic[] = [];
}
