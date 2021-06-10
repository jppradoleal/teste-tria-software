import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/core/components/modal/modal.component';
import { Rarity } from 'src/core/models/enum/rarity.enum';
import { ModalConfig } from 'src/core/models/modal-config.model';
import { add } from 'src/core/store/cart.store';
import Comic from '../../core/models/comic.model';
import { ComicsService } from '../../core/services/comics.service';
import { sample } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: ModalComponent;

  comics: Comic[] = [];
  cart$: Observable<Comic[]>;
  modalConfig: ModalConfig;
  selectedItem?: Comic;
  private rarities = ['common', 'rare', 'ultrarare'];

  private start = 0;
  private limit = 12;

  constructor(
    private comicsService: ComicsService,
    private store: Store<{ cart: Comic[] }>,
    private ref: ChangeDetectorRef
  ) {
    this.cart$ = store.select('cart');
    this.modalConfig = {
      modalTitle: 'Comic',
      closeButtonLabel: 'Fechar',
      disableDismissButton: () => true,
      hideDismissButton: () => true,
    } as ModalConfig;
  }

  addToCart(item: Comic) {
    console.log(item);
    this.store.dispatch(add({ comic: item }));
  }

  ngOnInit() {
    alert(Object.values(Rarity).slice(0, 3))
    this.comicsService.getComics(0, 12).subscribe((response) => {
      this.comics = response.data.results.map((comic) => {
        comic.rarity = sample(Object.values(Rarity).slice(0, 3)) as Rarity;
        return comic;
      });
    });
  }

  selectItem(item: Comic) {
    this.selectedItem = item;
    this.modalComponent.modalConfig.modalTitle = item.title;
    this.openModal();
  }

  onScroll() {
    this.start += this.limit;
    this.comicsService
      .getComics(this.start, this.limit)
      .subscribe((response) => {
        const results = response.data.results.map((comic) => {
          comic.rarity = sample(Object.values(Rarity).slice(0, 3)) as Rarity;
          return comic;
        });
        this.comics.push(...results);
      });
  }

  async openModal() {
    return await this.modalComponent.open();
  }
}
