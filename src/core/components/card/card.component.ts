import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Comic from 'src/core/models/comic.model';
import { ComicsService } from 'src/core/services/comics.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() comic: Comic = {} as Comic;
  @Output() onAddToCart: EventEmitter<Comic> = new EventEmitter();
  @Output() onShowModal: EventEmitter<Comic> = new EventEmitter();

  addToCart(comic: Comic) {
    this.onAddToCart.emit(comic);
  }

  showModal(comic: Comic) {
    this.onShowModal.emit(comic);
  }
}
